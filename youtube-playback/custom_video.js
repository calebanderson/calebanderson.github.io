import CustomCookie from './custom_cookie.js';

import './bookmark_button.js';
import './playback_rate_display.js';
import './endcard_toggle.js';
import './auto_pause_toggle.js';

window.customCookie = CustomCookie;

class CustomVideo {
  static rateScalar = 1.2599;
  static rateAdder = 0.00003;
  static seekDuration = 5;
  static inputSelector = 'yt-user-mention-autosuggest-input';
  static badgeContainerSelector = '#above-the-fold, ytd-video-primary-info-renderer #container';
  static videoElementSelector = 'video[src]';
  static customElementContainerID = 'custom_element_container';
  static #domInit;

  static isInputFocused() {
    const inputs = document.querySelectorAll(this.inputSelector);
    return [...inputs].includes(document.activeElement);
  }

  constructor(video) {
    if (!CustomVideo.#domInit) {
      this.customElementContainer = document.createElement('div');
      this.customElementContainer.id = CustomVideo.customElementContainerID;

      const outerContainer = document.querySelector(CustomVideo.badgeContainerSelector);
      outerContainer.prepend(this.customElementContainer);

      const playbackRateDisplay = document.createElement('playback-rate-display');
      this.customElementContainer.append(playbackRateDisplay);

      const endcardToggle = document.createElement('endcard-toggle');
      this.customElementContainer.append(endcardToggle);

      const autoPauseToggle = document.createElement('auto-pause-toggle');
      this.customElementContainer.append(autoPauseToggle);

      CustomVideo.#domInit = true;
    }

    this.element = video;
    this.playbackRate = CustomCookie.rate;
    CustomCookie.trimCookie();

    document.addEventListener('keydown', this.interceptKeypress.bind(this), true);
  }

  element;
  loopPoints = new Set();

  get customFunctionMap() {
    return {
      37: this.seekBackward,
      39: this.seekForward,
      219: this.decreaseRate,
      221: this.increaseRate,
      85: this.addBookmark,
      79: this.addLoopPoint,
      80: this.clearLoopPoints,
    };
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

  focusVideo() { this.element.focus(); }

  // Pretty sure there's a constant-ish value that could be calculated: rate (/ or *) (scalar + adder / rate)
  increaseRate() { this.playbackRate = this.playbackRate * CustomVideo.rateScalar + CustomVideo.rateAdder; }
  decreaseRate() { this.playbackRate = this.playbackRate / CustomVideo.rateScalar - CustomVideo.rateAdder; }

  seekTo(time) {
    this.time = time;
    this.focusVideo();
  }

  seekForward(event) { if (this.validSeek(event)) this.seekTo(this.time + CustomVideo.seekDuration); }
  seekBackward(event) { if (this.validSeek(event)) this.seekTo(this.time - CustomVideo.seekDuration); }

  validSeek(event) {
    if (!event.metaKey) {
      event.preventDefault();
      return true;
    }
    return false;
  }

  interceptKeypress(event) { this.functionForKeypress(event)(event); }

  functionForKeypress(event) {
    const func = this.customFunctionMap[event.which];
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

  bookmarkClick = (e) => { e.metaKey ? this.removeBookmark(e) : this.goToBookmarkTime(e); };
  removeBookmark(e) { e.currentTarget.remove(); }
  goToBookmarkTime(e) { this.seekTo(e.currentTarget.value); }
}

export default CustomVideo;
