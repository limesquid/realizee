import React, { PureComponent } from 'react';
import { subscribeSymbol, unsubscribeSymbol } from './constants';
import {
  bindHandlers,
  isFunction,
  isGeneratorFunction,
  isIterable,
  isModel,
  isPromise
} from './utils';

const proxyWatchers = new WeakMap();

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

      componentWillUnmount() {
        Object.values(this.state).forEach((value) => {
          if(isModel(value)) {
            const watcher = proxyWatchers[value];
            value[unsubscribeSymbol](watcher);
          }
        });
      }

      render() {
        // TODO: omit `realizeeBindings` in this.props
        // TODO: move and refactor computing computed properties to separate file + willReceiveProps
        const { computed, state } = this.props.realizeeBindings;
        const computedValues = Object.keys(computed).reduce((result, key) => {
          result[key] = computed[key].call(new Proxy({
            ...state,
            ...computed,
            ...result
          }, {
            get(target, key, receiver) {
              if(isFunction(target[key])) {
                return computed[key].call(receiver);
              }
              return target[key];
            }
          }));
          return result;
        }, {});

        return (
          <View
            {...this.props}
            {...this.state}
            {...computedValues}
            {...this.handlers} />
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

  const proxy = new Proxy(model, {
    get(target, key, receiver) {
      watchedProperties.push(key);
      return target[key];
    }
  });

  const watcher = (key, value) => {
    if(watchedProperties.includes(key)) {
      setState({
        [property]: {
          ...model,
          [key]: value
        }
      });
    }
  };

  proxyWatchers.set(proxy, watcher);
  model[subscribeSymbol](watcher);

  return proxy;
};
