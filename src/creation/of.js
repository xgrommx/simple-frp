import {noop, curry} from '../utils';

export default curry((value, {next = noop, error = noop, completed = noop}) => {
    let id;
    let disposed = false;

    if(!disposed) {
        id = setTimeout(() => {
            disposed = true;
            next(value);
            completed();
            clearTimeout(id);
        }, 0);
    }
    return () => {
        if(!disposed) {
            disposed = true;
            clearTimeout(id);
        }
    };
});