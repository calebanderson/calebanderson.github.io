import CustomBadge from './custom_badge.js';
import CustomVideoCallbacks from './custom_video_callbacks.js';
import Constants from './constants.js';

class PlaybackRateDisplay extends CustomBadge {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('playback-rate-display');
  }

  attributeChangedCallback() {
    this.textContent = `${new Constants().ratePrefix} ${this.value.toFixed(2)}`;
  }
}
customElements.define('playback-rate-display', PlaybackRateDisplay);

CustomVideoCallbacks.addSetterCallback('playbackRate', (val) => {
  document.querySelectorAll('playback-rate-display').forEach((display) => {
    display.value = val;
  });
});

CustomVideoCallbacks.addFunctionCallback('play', () => {
  if (window.customVideo && window.customVideo.element) {
    window.customVideo.element.playbackRate = window.customCookie.rate;
  }
});
