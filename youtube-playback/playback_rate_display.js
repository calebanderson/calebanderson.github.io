import CustomBadge from './custom_badge.js';
import CustomVideoCallbacks from './custom_video_callbacks.js';

class PlaybackRateDisplay extends CustomBadge {
  static displayPrefix = 'Playback Rate:';

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('playback-rate-display');
  }

  attributeChangedCallback() {
    this.textContent = `${PlaybackRateDisplay.displayPrefix} ${this.value.toFixed(2)}`;
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
