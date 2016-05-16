import {I} from './combinators';

export const noop = () => {};

export const compose = (...fns) => {
    let start = fns.length - 1;
    
    return (...args) => {
        let i = start;
        let result = fns[start](...args);
        while (i--) result = fns[i](result);
        return result;
    };
};

const _curry = (fn, ...args) => (...innerArgs) => fn(...args, ...innerArgs);

export const curry = (fn, n = fn.length) => 
    (...args) => args.length < n ? (n - args.length > 0 ? curry(_curry(fn, ...args), n - args.length) : _curry(fn, ...args)) : fn(...args);

export const reduce = curry((acc, seed, source) => {
    let value = seed;
    let index = -1;
    let length = source.length;

    while(index++ < length - 1) {
        value = acc(value, source[index], index, source);
    }

    return value;
});

export const head = ([head, ...tail]) => head;

export const tail = ([head, ...tail]) => tail;

export const length = ({length}) => length;

export const apply = fn => args => fn(...args);

export const unapply = fn => (...args) => fn(args);

export const of = v => [v];

export const empty = () => [];

export const concat = curry((x, y) => x.concat(y));

export const flatMap = curry((fn, source) => reduce((acc, next) => concat(acc)(fn(next)))(empty())(source));

export const map = curry((fn, source) => flatMap(value => of(fn(value)))(source));

export const filter = curry((predicate, source) => flatMap(value => predicate(value) ? of(value) : empty())(source));

export const ap = curry((fns, source) => flatMap(fn => map(value => fn(value))(source))(fns));

export const lift = fn => unapply(reduce(ap)(of(fn)));

export const converge = resultSelector => (...fns) => (...args) => apply(resultSelector)(ap(map(fn => apply(fn))(fns))(of(args)));

export const juxt = apply(converge(unapply(I)));