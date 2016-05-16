import {noop, curry} from '../utils';

// defer :: Number -> Stream a -> Stream a
export default curry((time, source) => ({
    next = noop,
    error = noop,
    completed = noop
}) => {
    let id;
    let disposed = false;

    if(!disposed) {
        id = setTimeout(() => {
            disposed = true;
            source({next, error, completed});
            clearTimeout(id);
        }, time);
    }

    return () => {
        if(!disposed) {
            disposed = true;
            clearTimeout(id);
        }
    }
});