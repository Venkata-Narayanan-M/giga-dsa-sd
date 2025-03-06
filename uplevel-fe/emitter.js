class Emitter {
  _registry = {};
  constructor() {
    // this._registry = {};
  }
  on(name, callback) {
    console.log("on called", name);
    if (!this._registry[name]) {
      this._registry[name] = [];
    }
    this._registry[name].push(callback);
  }
  fire(name, payload) {
    console.log(this._registry);
    (this._registry[name] || []).forEach((callback) => callback(payload));
  }
  off(name, callback) {
    this._registry[name] = (this._registry[name] || []).filter(
      (func) => func !== callback
    );
  }
}

const emitter = new Emitter();

const handler = (myArg) => {
  console.log(`Handler called with ""${myArg}""`);
};

emitter.on("custom-event", handler);
emitter.fire("custom-event", [1, 2, 3]);
emitter.off("custom-event", handler);
