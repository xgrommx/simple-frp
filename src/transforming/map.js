import {curry, noop} from '../utils';

// map :: (a -> b) -> Stream a -> Stream b
export default curry((fn, source) => ({next = noop, error = noop, completed = noop}) => {
    return source({next: x => next(fn(x)), error, completed});
});