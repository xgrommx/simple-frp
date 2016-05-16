import {curry, noop} from '../utils';

// do :: (a -> void) -> Stream a -> Stream a
export default curry((fn, source) => ({next = noop, error = noop, completed = noop}) => {
    return source({
        next: v => {
            fn(v);
            next(v);
        },
        error,
        completed
    });
});