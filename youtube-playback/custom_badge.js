import CustomHTMLElement from './custom_html_element.js';
import CustomStylesheet from './custom_stylesheet.js';

class CustomBadge extends CustomHTMLElement {
  connectedCallback(){
    super.connectedCallback();
    this.classList.add('custom-action-badge');
  }

  get value(){
    return parseFloat(this.getAttribute('value'));
  }
  set value(val){
    this.setAttribute('value', val);
  }

  get hidden(){
    return this.hasAttribute('hidden');
  }
  set hidden(val){
    if(!!val){
      this.setAttribute('hidden', '');
    } else {
      this.removeAttribute('hidden');
    }
  }

  hide(){
    this.hidden = true;
  }
  show(){
    this.hidden = false;
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(_name, _oldValue, _newValue){
    this.textContent = this.value;
  }
}

CustomStylesheet.add(`
  .custom-action-badge {
    color: #FFF;
    display: inline-block;
    font-size: 14px;
    background-color: #248;
    padding: 2px 10px;
    margin: 0px 8px 8px 0px;
    border: 1px #555 solid;
    border-radius: 12px;
  }
  .custom-action-badge[hidden] {
    display: none;
  }
  .custom-action-badge.clickable {
    cursor: pointer;
  }
  .custom-action-badge.clickable:hover:not(:active) {
    background-color: #359;
  }
`);

export default CustomBadge;
