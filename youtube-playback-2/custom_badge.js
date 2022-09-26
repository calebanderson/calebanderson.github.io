import CustomHTMLElement from './custom_html_element.js';

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

export default CustomBadge;
