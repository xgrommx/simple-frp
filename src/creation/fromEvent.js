import {noop, curry} from '../utils';

export default curry((name, element) => ({next = noop, error = noop, completed = noop}) => {
    let disposed = false;

    if(!disposed) {
        element.addEventListener(name, (e) => next(e));
    }

    return () => {
        if(!disposed) {
            disposed = true;
            element.removeEventListener(name, (e) => next(e));
        }
    };
});