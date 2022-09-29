// The reason this is useful is because youtube doesn't actually end up firing the majority of the events that
//   exist on HTMLVideoElement. It does fire play/playing/pause/ended (which is actually very useful since Google Cast
//   bugs out and stops sending those signals if you pause, then play after more than ~10 seconds) but ratechange/
//   loadstart are not able to use event listeners.
// TODO: move addFunctionCallback to an eventListener applier pattern within the constructor? E.g. have a list of
//   callbacks that are applied to existing video elements, and modify the constructor to apply them on creation.

const CustomVideoCallbacks = {
  addSetterCallback(propName, func){
    this.registerProp(propName);
    this.callbackList(propName).add(func);
  },

  addFunctionCallback(funcName, func){
    this.registerFunc(funcName);
    this.callbackList(funcName).add(func);
  },

  get registeredCallbacks(){
    return this._registeredCallbacks = this._registeredCallbacks || [];
  },

  registerCallback(propName, overrideKey) {
    if(this.registeredCallbacks.includes(propName)) return;
    if(typeof(propName) !== 'string') throw new Error('argument must be a string');

    Object.defineProperty(this, this.callbackListName(propName), {
      value: new Set,
      configurable: true
    });

    const origProp = this.findCurrentProperty(propName);
    let override = { configurable: true };
    override[overrideKey] = function(val){
      origProp[overrideKey].call(this, val);

      const callbacks = CustomVideoCallbacks.callbackList(propName);
      for(const callback of callbacks){
        callback.call(this, val);
      }
    };

    const newProp = Object.assign({}, origProp, override);
    Object.defineProperty(HTMLVideoElement.prototype, propName, newProp);

    this.registeredCallbacks.push(propName);
  },

  registerProp(propName){
    this.registerCallback(propName, 'set');
  },

  registerFunc(funcName){
    this.registerCallback(funcName, 'value');
  },

  callbackList(propName){
    return this[this.callbackListName(propName)];
  },
  callbackListName(propName){
    return 'onSet' + propName.charAt(0).toUpperCase() + propName.slice(1);
  },

  findCurrentProperty(propName){
    let elementProto = HTMLVideoElement.prototype;
    let property;
    let depth = 0;

    while(elementProto && !property){
      property = Object.getOwnPropertyDescriptor(elementProto, propName);
      elementProto = Object.getPrototypeOf(elementProto);
      depth++;
    }

    if(property && !property.configurable && depth === 1){
      throw new Error(`cannot override behavior for '${propName}'`);
    }
    if(!elementProto){
      throw new Error(`cannot find property '${propName}'`);
    }
    return property;
  }
}

export default CustomVideoCallbacks;
