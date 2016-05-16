import {noop} from '../utils';

export default () => ({next = noop, error = noop, completed = noop}) => {
    let disposed = false;

    if(!disposed) {
        disposed = true;
        completed();
    }

    return noop;
};