import CustomHTMLElement from './custom_html_element.js';

class CustomBadge extends CustomHTMLElement {
  static get observedAttributes() { return ['value']; }

  get value() { return parseFloat(this.getAttribute('value')); }
  set value(val) { this.setAttribute('value', val); }

  get hidden() { return this.hasAttribute('hidden'); }
  set hidden(val) { val ? this.setAttribute('hidden', '') : this.removeAttribute('hidden'); }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('custom-action-badge');
  }

  hide() { this.hidden = true; }
  show() { this.hidden = false; }

  attributeChangedCallback() {
    this.textContent = this.value.toString();
  }
}

export default CustomBadge;
