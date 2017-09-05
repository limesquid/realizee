import React, { PureComponent } from 'react';
import { subscribeSymbol } from './constants';
import {
  bindHandlers,
  isFunction,
  isGeneratorFunction,
  isIterable,
  isModel,
  isPromise
} from './utils';

export default function ViewModel(config) {
  const getConfig = isFunction(config) ? config : () => config;

  return (View) => {
    class RealizeeComponent extends PureComponent {
      constructor(props, ...restArguments) {
        super(props, ...restArguments);
        const bindings = props.realizeeBindings;
        Object.assign(RealizeeComponent.prototype, bindings.lifecycle || {})
        this.state = manageState(bindings.state, this.setState.bind(this));
        this.handlers = bindHandlers(this, bindings.handlers);
      }

      render() {
        // TODO: omit `realizeeBindings` in this.props
        return (
          <View {...this.props} {...this.state} {...this.handlers} />
        );
      }
    };

    return (...models) => () => (
      <RealizeeComponent realizeeBindings={getConfig(...models)} />
    );
  };
}

const manageState = (state, setState) => Object.keys(state).reduce((result, property) => {
  result[property] = manageStateProperty(state, property, setState);
  return result;
}, {});

const manageStateProperty = (state, property, setState) => {
  const value = state[property];

  if(isPromise(value)) {
    return handlePromise(value, property, setState);
  }

  if(isIterable(value)) {
    return handleIterable(value, property);
  }

  if(isGeneratorFunction(value)) {
    return handleGenerator(value, property);
  }

  if(isModel(value)) {
    return handleModel(value, property, setState);
  }

  return value;
};

const handlePromise = (promise, property, setState) => {
  promise.then((value) => setState({ [property]: value }));
  return undefined;
};

const handleGenerator = (generator) => Array.from(generator());

const handleIterable = (iterable) => Array.from(iterable);

const handleModel = (model, property, setState) => {
  // TODO: check for memory leaks
  const watchedProperties = [];

  model[subscribeSymbol]((key, value) => {
    if(watchedProperties.includes(key)) {
      setState({
        [property]: {
          ...model,
          [key]: value
        }
      });
    }
  });

  return new Proxy(model, {
    get(target, key, receiver) {
      watchedProperties.push(key);
      return target[key];
    }
  });
};
