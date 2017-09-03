import { bindHandlers, isFunction } from './utils';

export default function Model(model) {
  const createModel = isFunction(model) ? model : () => model;

  return (...parameters) => {
    const model = createModel(...parameters);
    const { attributes, functions } = extractAttributesAndFunctions(model);
    const enhancedModel = {};
    Object.assign(enhancedModel, attributes, functions);
    bindHandlers(enhancedModel, functions)
    return enhancedModel;
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
