import {noop, curry} from '../utils';

export default curry((value, {next = noop, error = noop, completed = noop}) => {
    let disposed = false;

    if(!disposed) {
        disposed = true;
        next(value);
        completed();
    }

    return noop;
});