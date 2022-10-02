// De-shimming some of the custom-elements-es5-adapter.js shim that youtube uses
customElements.define = CustomElementRegistry.prototype.define;
customElements.get = CustomElementRegistry.prototype.get;
// eslint-disable-next-line no-global-assign
HTMLElement = HTMLElement.prototype.constructor;
