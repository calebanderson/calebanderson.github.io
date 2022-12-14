import CustomVideoCallbacks from './custom_video_callbacks.js';
import CustomToggleGroup from './custom_toggle_group.js';
import Constants from './constants.js';

class AutoPauseToggle extends CustomToggleGroup {
  // active = on = day mode
  static get observedAttributes() { return ['active', 'pending']; }

  constructor() {
    super();

    this.onButton.textContent = Constants.autoPauseOn;
    this.onButton.addEventListener('click', () => this.toggle());

    this.offButton.textContent = Constants.autoPauseOff;
    this.offButton.addEventListener('click', () => this.toggle());
  }

  get pending() { return this.hasAttribute('pending'); }
  set pending(val) { val ? this.setAttribute('pending', '') : this.removeAttribute('pending'); }

  attributeChangedCallback(name) {
    super.attributeChangedCallback();

    if (name === 'active') this.pending = !this.active;
    if (name === 'pending') this.pendingChanged();
  }

  pendingChanged() {
    clearInterval(this.timeoutPromise);
    if (!this.pending) return;

    this.timeoutPromise = setTimeout(() => {
      this.pending = false;
      window.customVideo.element.pause();
    }, Constants.autoPauseInterval * 60 * 1000);
  }
}
customElements.define('auto-pause-toggle', AutoPauseToggle);

CustomVideoCallbacks.addFunctionCallback('play', () => {
  (window?.customVideo?.element || {}).onplay = () => {
    const pauserList = document.querySelectorAll('auto-pause-toggle');
    pauserList.forEach((pauser) => { pauser.pending = !pauser.active; });
  };
});
