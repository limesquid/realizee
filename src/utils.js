export const isFunction = (subject) => typeof subject === 'function';

export const isGenerator = (subject) => subject && isFunction(subject.next) && isFunction(subject.throw);

export const isGeneratorFunction = (subject) => isFunction(subject) && subject.constructor && subject.constructor.name === 'GeneratorFunction';

export const isIterable = (subject) => Boolean(subject[Symbol.iterator]);

export const isPromise = (subject) => Promise.resolve(subject) === subject;
