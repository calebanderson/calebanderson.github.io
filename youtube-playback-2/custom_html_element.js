import CustomStylesheet from './custom_stylesheet.js';

class CustomHTMLElement extends HTMLElement {
  connectedCallback(){
    CustomStylesheet.attach(this.getRootNode());
  }
}

export default CustomHTMLElement;
