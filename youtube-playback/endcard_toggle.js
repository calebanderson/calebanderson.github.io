import CustomToggleGroup from './custom_toggle_group.js';

class EndcardToggle extends CustomToggleGroup {
  // active = on = endcards shown
  constructor() {
    super();

    this.onButton.textContent = 'Endcards Hidden';
    this.onButton.addEventListener('click', () => this.toggle());

    this.offButton.textContent = 'Endcards Shown';
    this.offButton.addEventListener('click', () => this.toggle());
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
    const { body } = document;
    this.active ? body.removeAttribute('hide_endcard') : body.setAttribute('hide_endcard', '');
  }
}
customElements.define('endcard-toggle', EndcardToggle);
