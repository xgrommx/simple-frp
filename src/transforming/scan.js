import {noop, curry} from '../utils';

// scan :: (a -> b -> b) -> b -> Stream a -> Stream b
export default curry((acc, seed, source) => ({next = noop, error = noop, completed = noop}) => {
    let accumulation, first = true;

    return source({next: v => {
        if(first) {
            next(seed);
            accumulation = acc(seed, v);
            first = false;
        } else {
            accumulation = acc(accumulation, v)
        }

        next(accumulation);
    }, error, completed});
});