// De-shimming some of the custom-elements-es5-adapter.js shim that youtube uses
customElements.define = CustomElementRegistry.prototype.define;
customElements.get = CustomElementRegistry.prototype.get;
HTMLElement = HTMLElement.prototype.constructor;
