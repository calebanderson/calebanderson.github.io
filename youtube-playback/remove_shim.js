// De-shimming some of the custom-elements-es5-adapter.js shim that youtube uses
customElements.define = CustomElementRegistry.prototype.define;
customElements.get = CustomElementRegistry.prototype.get;

// Disabling this and inheriting directly from the prototype constructor instead. Hopefully
// that will fix the problems with polymer from the youtube update in June 2023.
// eslint-disable-next-line no-global-assign
// HTMLElement = HTMLElement.prototype.constructor;
