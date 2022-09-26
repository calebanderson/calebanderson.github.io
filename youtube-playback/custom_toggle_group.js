import './custom_toggle_button.js';
import CustomHTMLElement from './custom_html_element.js';
import CustomStylesheet from './custom_stylesheet.js';

class CustomToggleGroup extends CustomHTMLElement {
  constructor(){
    super();

    const shadow = this.attachShadow({mode: 'open'});

    this.onButton = document.createElement('custom-toggle-button');
    this.onButton.classList.add('on-button');
    shadow.appendChild(this.onButton);

    this.offButton = document.createElement('custom-toggle-button');
    this.offButton.classList.add('off-button');
    shadow.appendChild(this.offButton);
  }

  connectedCallback(){
    super.connectedCallback();
    this.active = true;
  }

  get active(){
    return this.hasAttribute('active');
  }
  set active(val){
    if(!!val){
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  toggle(){
    this.active = !this.active;
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(_name, _oldValue, _newValue){
    if(this.active){
      this.onButton.hide();
      this.offButton.show();
    } else {
      this.onButton.show();
      this.offButton.hide();
    }
  }
}
CustomStylesheet.add(`
  .custom-action-badge.toggle-button.on-button{
    background-color: #444;
  }
  .custom-action-badge.toggle-button.on-button:hover:not(:active) {
    background-color: #555;
  }
`);

export default CustomToggleGroup;
