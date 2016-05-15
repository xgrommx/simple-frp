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