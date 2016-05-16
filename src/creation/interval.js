import {noop, curry} from '../utils';

export default curry((time, {next = noop, error = noop, completed = noop}) => {
    let i = 0;
    let disposed = false;
    let id;

    if(!disposed) {
        id = setInterval(() => {
            next(i++);
        },time);
    }

    return () => {
        if(!disposed) {
            disposed = true;
            clearInterval(id);
        }
    }
});