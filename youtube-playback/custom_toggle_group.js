import './custom_toggle_button.js';
import CustomHTMLElement from './custom_html_element.js';

export default class CustomToggleGroup extends CustomHTMLElement {
  static get observedAttributes() { return ['active']; }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    this.onButton = document.createElement('custom-toggle-button');
    this.onButton.classList.add('on-button');
    shadow.appendChild(this.onButton);

    this.offButton = document.createElement('custom-toggle-button');
    this.offButton.classList.add('off-button');
    shadow.appendChild(this.offButton);
  }

  get active() { return this.hasAttribute('active'); }
  set active(val) { val ? this.setAttribute('active', '') : this.removeAttribute('active'); }

  connectedCallback() {
    super.connectedCallback();
    this.active = true;
  }

  toggle() { this.active = !this.active; }

  attributeChangedCallback() {
    if (this.active) {
      this.onButton.hide();
      this.offButton.show();
    } else {
      this.onButton.show();
      this.offButton.hide();
    }
  }
}
