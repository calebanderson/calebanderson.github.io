import CustomCookie from './custom_cookie.js';

import './bookmark_button.js';
import './playback_rate_display.js';
import './endcard_toggle.js';
import './auto_pause_toggle.js';

window.customCookie = CustomCookie;

class CustomVideo {
  static playbackScalar = 1.2599;
  static playbackAdder = 0.00003;
  static seekDuration = 5;
  static inputSelector = 'yt-user-mention-autosuggest-input';
  static badgeContainerSelector = '#above-the-fold, ytd-video-primary-info-renderer #container';
  static videoElementSelector = 'video[src]';
  static customElementContainerID = 'custom_element_container';

  static isInputFocused() {
    const inputs = document.querySelectorAll(this.inputSelector);
    return [...inputs].includes(document.activeElement);
  }

  constructor(video) {
    if (!CustomVideo._domInit) {
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

      CustomVideo._domInit = true;
    }

    this.element = video;
    this.playbackRate = CustomCookie.rate;
    CustomCookie.trimCookie();

    document.addEventListener('keydown', this.interceptKeypress.bind(this), true);
  }

  get customFunctionMap() {
    return {
      37: this.seekBackward,
      39: this.seekForward,
      219: this.decreasePlaybackRate,
      221: this.increasePlaybackRate,
      85: this.addBookmark,
      79: this.addLoopPoint,
      80: this.clearLoopPoints,
    };
  }

  get element() { return this._element; }

  set element(video) { this._element = video; }

  get time() { return this.element.currentTime; }

  set time(val) { this.element.currentTime = val; }

  get playbackRate() { return this.element.playbackRate; }

  set playbackRate(rate) {
    rate = Math.round(parseFloat(rate) * 100) / 100; // round to 2 decimal places

    if (this.playbackRate !== rate) {
      this.focusVideo();
      CustomCookie.rate = rate;
    }
    this.element.playbackRate = rate;
  }

  get loopPoints() { return this._loopPoints = this._loopPoints || new Set(); }

  get loopStart() { return [...this.loopPoints].sort()[0]; }

  get loopEnd() { return [...this.loopPoints].sort().reverse()[0]; }

  focusVideo() { this.element.focus(); }

  increasePlaybackRate() {
    this.playbackRate = this.playbackRate * CustomVideo.playbackScalar + CustomVideo.playbackAdder;
  }

  decreasePlaybackRate() {
    this.playbackRate = this.playbackRate / CustomVideo.playbackScalar - CustomVideo.playbackAdder;
  }

  seekTo(time) {
    this.time = time;
    this.focusVideo();
  }

  seekForward(event) {
    if (this.validSeek(event)) this.seekTo(this.time + CustomVideo.seekDuration);
  }

  seekBackward(event) {
    if (this.validSeek(event)) this.seekTo(this.time - CustomVideo.seekDuration);
  }

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
    if (func && !CustomVideo.isInputFocused()) {
      return func.bind(this);
    }
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

  bookmarkClick = (event) => {
    if (event.metaKey) {
      this.removeBookmark(event);
    } else {
      this.goToBookmarkTime(event);
    }
  };

  removeBookmark(event) { event.currentTarget.remove(); }

  goToBookmarkTime(event) { this.seekTo(event.currentTarget.value); }
}

export default CustomVideo;
