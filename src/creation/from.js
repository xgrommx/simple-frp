import {noop, curry} from '../utils';

export default curry((array, {next = noop, error = noop, completed = noop}) => {
    let disposed = false;
    let index = -1;
    let length = array.length;

    while(index < length - 1) {
        if(!disposed) {
            next(array[++index]);
        } else {
            break;
        }
    }
    completed();
    disposed = true;

    return () => {
        disposed = true;
    }
});