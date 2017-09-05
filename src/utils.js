import { modelSymbol } from './constants';

export const bindHandlers = (context, handlers = {}) => Object.keys(handlers).reduce((bound, key) => {
  bound[key] = handlers[key].bind(context);
  return bound;
}, {});

export const isFunction = (subject) => typeof subject === 'function';

export const isGenerator = (subject) => subject && isFunction(subject.next) && isFunction(subject.throw);

export const isGeneratorFunction = (subject) => isFunction(subject) && subject.constructor && subject.constructor.name === 'GeneratorFunction';

export const isIterable = (subject) => Boolean(subject[Symbol.iterator]);

export const isPromise = (subject) => Promise.resolve(subject) === subject;

export const isModel = (subject) => Boolean(subject[modelSymbol]);
