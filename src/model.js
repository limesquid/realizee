import { bindHandlers, isFunction } from './utils';

const watchers = Symbol('watchers');

export default function Model(model) {
  const createModel = isFunction(model) ? model : () => model;

  return (...parameters) => {
    const model = createModel(...parameters);
    const { attributes, functions } = extractAttributesAndFunctions(model);
    Object.assign(model, attributes, functions);
    bindHandlers(model, functions);
    const proxy = new Proxy(model, {
      set(target, key, value, res) {
        target[key] = value;
        Array.from(proxy[watchers]).forEach((watcher) => watcher(key, value));
        return true;
      }
    });
    proxy[watchers] = new Set();
    proxy.subscribe = function(watcher) {
      proxy[watchers].add(watcher);
    };
    return proxy;
  };
}

const extractAttributesAndFunctions = (model = {}) => {
  let attributes = {};
  let functions = {};
  Object.keys(model).forEach((key) => {
    const value = model[key];
    // TODO: add promise/stream/etc. handling
    if (isFunction(value)) {
      functions[key] = value;
    } else {
      attributes[key] = value;
    }
  })
  return { attributes, functions };
};
