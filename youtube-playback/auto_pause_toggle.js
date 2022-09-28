import CustomVideoCallbacks from './custom_video_callbacks.js';
import CustomToggleGroup from './custom_toggle_group.js';

class AutoPauseToggle extends CustomToggleGroup {
  // active = on = day mode
  static interval = 900000; // 15 minutes

  static get observedAttributes() {
    return ['active', 'pending'];
  }

  constructor(){
    super();

    this.onButton.textContent = 'Night Mode';
    this.onButton.addEventListener('click', e => this.toggle());

    this.offButton.textContent = 'Day Mode';
    this.offButton.addEventListener('click', e => this.toggle());
  }

  attributeChangedCallback(name, _oldValue, _newValue){
    super.attributeChangedCallback(name, _oldValue, _newValue);

    if(name === 'active') {
      this.pending = true; // canceled downstream if "day mode"
    } else if(name === 'pending') {
      this.pendingChanged();
    }
  }

  pendingChanged(){
    clearInterval(this.timeoutPromise);

    if(this.pending){
      this.timeoutPromise = setTimeout(function(){
        this.pending = false;
        window.customVideo.element.pause();
      }.bind(this), AutoPauseToggle.interval);
    }
  }

  get pending(){
    return this.hasAttribute('pending');
  }

  set pending(val){
    if(this.active || !val){
      this.removeAttribute('pending');
    } else {
      this.setAttribute('pending', '');
    }
  }
}
customElements.define('auto-pause-toggle', AutoPauseToggle);

CustomVideoCallbacks.addFunctionCallback('play',
  function(val){
    const pauserList = document.querySelectorAll('auto-pause-toggle');
    for(const pauser of pauserList){
      pauser.pending = true;
    }
  }
);
