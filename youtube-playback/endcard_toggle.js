import CustomToggleGroup from './custom_toggle_group.js';
import Constants from './constants.js';

class EndcardToggle extends CustomToggleGroup {
  // active = on = endcards shown
  constructor() {
    super();

    this.onButton.textContent = Constants.endcardsHidden;
    this.onButton.addEventListener('click', () => this.toggle());

    this.offButton.textContent = Constants.endcardsShown;
    this.offButton.addEventListener('click', () => this.toggle());
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
    const { body } = document;
    this.active ? body.removeAttribute('hide_endcard') : body.setAttribute('hide_endcard', '');
  }
}
customElements.define('endcard-toggle', EndcardToggle);
