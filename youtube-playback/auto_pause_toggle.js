import CustomVideoCallbacks from './custom_video_callbacks.js';
import CustomToggleGroup from './custom_toggle_group.js';

class AutoPauseToggle extends CustomToggleGroup {
  // active = on = day mode
  static interval = 900000; // 15 minutes

  static get observedAttributes() {
    return ['active', 'pending'];
  }

  constructor() {
    super();

    this.onButton.textContent = 'Night Mode';
    this.onButton.addEventListener('click', () => this.toggle());

    this.offButton.textContent = 'Day Mode';
    this.offButton.addEventListener('click', () => this.toggle());
  }

  get pending() { return this.hasAttribute('pending'); }

  set pending(val) {
    if (val) {
      this.setAttribute('pending', '');
    } else {
      this.removeAttribute('pending');
    }
  }

  attributeChangedCallback(name, _oldValue, _newValue) {
    super.attributeChangedCallback(name, _oldValue, _newValue);

    if (name === 'active') {
      this.pending = !this.active;
    } else if (name === 'pending') {
      this.pendingChanged();
    }
  }

  pendingChanged() {
    clearInterval(this.timeoutPromise);

    if (this.pending) {
      this.timeoutPromise = setTimeout(() => {
        this.pending = false;
        window.customVideo.element.pause();
      }, AutoPauseToggle.interval);
    }
  }
}
customElements.define('auto-pause-toggle', AutoPauseToggle);

CustomVideoCallbacks.addFunctionCallback(
  'play',
  () => {
    (window?.customVideo?.element || {}).onplay = () => {
      document.querySelectorAll('auto-pause-toggle').forEach((pauser) => {
        pauser.pending = !pauser.active;
      });
    };
  },
);
