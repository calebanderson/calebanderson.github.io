import CustomBadge from './custom_badge.js';

class CustomToggleButton extends CustomBadge {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('toggle-button', 'clickable');
  }
}
customElements.define('custom-toggle-button', CustomToggleButton);
