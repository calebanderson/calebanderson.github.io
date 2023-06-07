import CustomCookie from './custom_cookie.js';
import Constants from './constants.js';
import './bookmark_button.js';
import './playback_rate_display.js';
import './endcard_toggle.js';
import './auto_pause_toggle.js';

window.customCookie = CustomCookie;

class CustomVideo {
  static customElementContainerID = 'custom_element_container';
  static #domInit;
  loopPoints = new Set();

  constructor(video) {
    if (!CustomVideo.#domInit) {
      this.customElementContainer = document.createElement('div');
      this.customElementContainer.id = CustomVideo.customElementContainerID;

      const outerContainer = document.querySelector(Constants.badgeContainerSelector);
      outerContainer.prepend(this.customElementContainer);

      const playbackRateDisplay = document.createElement('playback-rate-display');
      this.customElementContainer.append(playbackRateDisplay);

      const endcardToggle = document.createElement('endcard-toggle');
      this.customElementContainer.append(endcardToggle);

      const autoPauseToggle = document.createElement('auto-pause-toggle');
      this.customElementContainer.append(autoPauseToggle);

      CustomVideo.#domInit = true;
    }

    this._element = video;
    this.playbackRate = CustomCookie.rate;
    CustomCookie.trimCookie();

    document.addEventListener('keydown', this.interceptKeypress.bind(this), true);
  }

  _element;

  get element() {
    if (this._element.src) { return this._element; }
    this._element = document.querySelector('video[src]');
    return this._element;
  }

  get customFunctionMap() {
    const expandedMap = new Map();
    [
      [Constants.addBookmark, this.addBookmark],
      [Constants.seekForward, this.seekForward],
      [Constants.seekBackward, this.seekBackward],
      [Constants.increaseRate, this.increaseRate],
      [Constants.decreaseRate, this.decreaseRate],
      [Constants.addLoopPoint, this.addLoopPoint],
      [Constants.clearLoopPoints, this.clearLoopPoints],
    ].forEach(([keys, func]) => {
      [...keys].forEach((key) => { expandedMap.set(key, func); });
    });
    return expandedMap;
  }

  get time() { return this.element.currentTime; }

  set time(val) { this.element.currentTime = val; }

  get playbackRate() { return this.element.playbackRate; }

  set playbackRate(val) {
    const rate = Math.round(parseFloat(val) * 100) / 100; // round to 2 decimal places

    if (this.playbackRate !== rate) {
      this.focusVideo();
      CustomCookie.rate = rate;
    }
    this.element.playbackRate = rate;
  }

  get loopStart() { return [...this.loopPoints].sort()[0]; }

  get loopEnd() { return [...this.loopPoints].sort().reverse()[0]; }

  get scalar() { return Constants.rateScalar + Constants.rateAdder / this.playbackRate; }

  static isInputFocused() {
    const inputs = document.querySelectorAll(this.inputSelector);
    return [...inputs].includes(document.activeElement);
  }

  focusVideo() { this.element.focus(); }

  increaseRate() { this.playbackRate *= this.scalar; }
  decreaseRate() { this.playbackRate /= this.scalar; }

  seekTo(time, event) {
    if (event && !this.validSeek(event)) return false;
    this.time = time;
    this.focusVideo();
    return true;
  }

  seekForward(event) { this.seekTo(this.time + Constants.seekDuration, event); }
  seekBackward(event) { this.seekTo(this.time - Constants.seekDuration, event); }

  validSeek(event) {
    if (!event.metaKey) {
      event.preventDefault();
      return true;
    }
    return false;
  }

  interceptKeypress(event) { this.functionForKeypress(event)(event); }

  functionForKeypress(event) {
    const func = this.customFunctionMap.get(event.key);
    if (func && !CustomVideo.isInputFocused()) return func.bind(this);
    return () => {}; // no-op
  }

  addLoopPoint() {
    this.loopPoints.add(this.time);
    this.updateLoop();
  }

  clearLoopPoints() {
    this.loopPoints.clear();
    this.updateLoop();
  }

  updateLoop() {
    clearInterval(this.loopIntervalID);

    if (this.loopPoints.size > 1) {
      this.loopIntervalID = setInterval(this.loop, 50);

      this.time = this.loopStart;
      this.element.play();
    }
  }

  loop = () => {
    if (this.time > this.loopEnd || this.time < this.loopStart) this.time = this.loopStart;
  };

  addBookmark() {
    const button = document.createElement('bookmark-button');
    button.value = this.time;
    button.videoUrl = this.element.baseURI;
    button.addEventListener('click', this.bookmarkClick);

    this.customElementContainer.append(button);
  }

  bookmarkClick = (e) => { this.seekTo(e.currentTarget.value, e) || e.currentTarget.remove(); };
}

export default CustomVideo;
