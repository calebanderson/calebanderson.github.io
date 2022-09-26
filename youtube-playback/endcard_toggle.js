import CustomToggleGroup from './custom_toggle_group.js';

class EndcardToggle extends CustomToggleGroup {
  // active = on = endcards shown
  constructor(){
    super();

    this.onButton.textContent = 'Endcards Hidden';
    this.onButton.addEventListener('click', e => this.toggle());

    this.offButton.textContent = 'Endcards Shown';
    this.offButton.addEventListener('click', e => this.toggle());
  }

  attributeChangedCallback(_name, _oldValue, _newValue){
    super.attributeChangedCallback(_name, _oldValue, _newValue);

    if(this.active){
      document.body.removeAttribute('hide_endcard');
    } else {
      document.body.setAttribute('hide_endcard', '');
    }
  }
}
customElements.define('endcard-toggle', EndcardToggle);


export default EndcardToggle;
