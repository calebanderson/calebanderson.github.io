// de-shimming a ES5 shim that youtube uses
customElements.define = CustomElementRegistry.prototype.define;
customElements.get = CustomElementRegistry.prototype.get;
HTMLElement = HTMLElement.prototype.constructor;
