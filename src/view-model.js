import React, { PureComponent } from 'react';
import { bindHandlers, isFunction, isGeneratorFunction, isIterable, isPromise } from './utils';

export default function ViewModel(config) {
  const getConfig = isFunction(config) ? config : () => config;

  return (View) => {
    class RealizeeComponent extends PureComponent {
      constructor(props, ...restArguments) {
        super(props, ...restArguments);
        Object.assign(RealizeeComponent.prototype, props.config.lifecycle || {})
        this.state = manageState(props.config.state, this.setState.bind(this));
        this.handlers = bindHandlers(this, props.config.handlers);
      }

      render() {
        return (
          <View {...this.state} {...this.handlers} />
        );
      }
    };

    return (...models) => () => (
      <RealizeeComponent config={getConfig(...models)} />
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
    return handlePromise(state, property, setState);
  }

  if(isIterable(value)) {
    return handleIterable(state, property);
  }

  if(isGeneratorFunction(value)) {
    return handleGenerator(state, property);
  }

  if(value.subscribe) {
    const model = value;
    model.subscribe((key, value) => setState({
      [property]: {
        ...model
      }
    }));
  }

  return value;
};

const handlePromise = (state, property, setState) => {
  const promise = state[property];
  promise.then((value) => setState({ [property]: value }));
  return undefined; // TODO: ?
};

const handleGenerator = (state, property) => Array.from(state[property]());

const handleIterable = (state, property) => Array.from(state[property]);
