import CustomCookie from './custom_cookie.js';
window.customCookie = CustomCookie;

import './bookmark_button.js'
import './playback_rate_display.js'
import './endcard_toggle.js'
import './auto_pause_toggle.js'

class CustomVideo {
  static playbackScalar = 1.2599;
  static playbackAdder = 0.00003;
  static seekDuration = 5;
  static inputSelector = 'input[type=text], textarea';
  // static badgeContainerSelector = 'ytd-video-primary-info-renderer #container';
  static badgeContainerSelector = '#above-the-fold';
  static videoElementSelector = 'video[src]';
  static customElementContainerID = 'custom_element_container';

  get customFunctionMap(){
    return {
      37: this.seekBackward,
      39: this.seekForward,
      219: this.decreasePlaybackRate,
      221: this.increasePlaybackRate,
      85: this.addBookmark,
      79: this.addLoopPoint,
      80: this.clearLoopPoints
    }
  };

  get element(){
    return this._element;
  }
  set element(video){
    this._element = video;
  }

  get time(){
    return this.element.currentTime;
  }
  set time(val){
    this.element.currentTime = val;
  }

  get playbackRate(){
    return this.element.playbackRate;
  }
  set playbackRate(rate){
    rate = Math.round(parseFloat(rate) * 100) / 100;

    if(this.playbackRate != rate){
      this.focusVideo();
      CustomCookie.rate = rate;
    }
    this.element.playbackRate = rate;
  }

  focusVideo(){
    this.element.focus();
  }

  increasePlaybackRate(){
    this.playbackRate =
      this.playbackRate * CustomVideo.playbackScalar + CustomVideo.playbackAdder;
  }
  decreasePlaybackRate(){
    this.playbackRate =
      this.playbackRate / CustomVideo.playbackScalar - CustomVideo.playbackAdder;
  }

  seekTo(time){
    this.time = time;
    this.focusVideo();
  }
  seekForward(event){
    if(this.validateSeek(event)){
      this.seekTo(this.time + CustomVideo.seekDuration);
    }
  }
  seekBackward(event){
    if(this.validateSeek(event)){
      this.seekTo(this.time - CustomVideo.seekDuration);
    }
  }
  validateSeek(event){
    if(!event.metaKey){
      event.preventDefault();
      return true;
    } else {
      return false;
    }
  }

  interceptKeypress(event){
    this.functionForKeypress(event)(event);
  }

  functionForKeypress(event){
    const func = this.customFunctionMap[event.which];
    if(func && !CustomVideo.isInputFocused()){
      return func.bind(this);
    } else {
      return ()=>{};
    }
  }

  static isInputFocused(){
    const inputs = document.querySelectorAll(this.inputSelector);
    return [...inputs].includes(document.activeElement);
  }

  addLoopPoint(){
    this.loopPoints.add(this.time);
    this.updateLoop();
  }

  clearLoopPoints(){
    this.loopPoints.clear();
    this.updateLoop();
  }

  updateLoop(){
    clearInterval(this.loopIntervalID);

    if(this.loopPoints.size > 1){
      this.loopIntervalID = setInterval(this.loop, 50);

      this.time = this.loopStart;
      this.element.play();
    }
  }

  get loopPoints(){
    return this._loopPoints = this._loopPoints || new Set;
  }
  get loopStart(){
    return [...this.loopPoints].sort()[0];
  }
  get loopEnd(){
    return [...this.loopPoints].sort()[1];
  }

  loop = ()=>{
    if(this.time > this.loopEnd || this.time < this.loopStart){
      this.time = this.loopStart;
    }
  }

  addBookmark(){
    const button = document.createElement('bookmark-button');
    button.value = this.time;
    button.videoUrl = this.element.baseURI;
    button.addEventListener('click', this.bookmarkClick)

    this.customElementContainer.append(button);
  }
  bookmarkClick = (event)=>{
    if(event.metaKey){
      this.removeBookmark(event);
    } else {
      this.goToBookmarkTime(event);
    }
  }
  removeBookmark(event){
    event.currentTarget.remove();
  }
  goToBookmarkTime(event){
    this.seekTo(event.currentTarget.value);
  }

  constructor(video){
    if(!CustomVideo._domInit){
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
}

export default CustomVideo;