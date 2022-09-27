import CustomBadge from './custom_badge.js';
import CustomVideoCallbacks from './custom_video_callbacks.js';

class PlaybackRateDisplay extends CustomBadge {
  static displayPrefix = 'Playback Rate:';

  connectedCallback(){
    super.connectedCallback();
    this.classList.add('playback-rate-display');
  }

  attributeChangedCallback(_name, _oldValue, _newValue){
    this.textContent = `${PlaybackRateDisplay.displayPrefix} ${this.value.toFixed(2)}`;
  }
}
customElements.define('playback-rate-display', PlaybackRateDisplay);

CustomVideoCallbacks.addSetterCallback('playbackRate',
  function(val){
    const displayList = document.querySelectorAll('playback-rate-display');
    for(const display of displayList){
      display.value = val;
    }
  }
);

CustomVideoCallbacks.addFunctionCallback('play',
  function(val){
    // if(window.customVideo && window.customVideo.element && window.customCookie) {
    if(window.customVideo && window.customVideo.element) {
      window.customVideo.element.playbackRate = window.customCookie.rate
    }
  }
);

export default PlaybackRateDisplay;
