class CustomHTMLElement extends HTMLElement.prototype.constructor {
  static stylesheet = 'custom_styles.css';

  get styleTag() {
    const tag = document.createElement('link');
    tag.rel = 'stylesheet';
    tag.href = new URL(CustomHTMLElement.stylesheet, import.meta.url).href;
    return tag;
  }

  // Apply custom CSS file to DOM body or shadow DOM
  connectedCallback() {
    const dom = this.getRootNode();
    if (!dom.querySelector(`link[href='${this.styleTag.href}']`)) {
      (dom.body || dom).appendChild(this.styleTag);
    }
  }
}

export default CustomHTMLElement;
