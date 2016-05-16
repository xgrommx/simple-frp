import {noop} from '../utils';

export default count => source => ({next = noop, error = noop, completed = noop}) => {
    let _count = count;
    let disposed = false;

    return source({next: v => {
        if(!disposed) {
            if(_count === 0) {
                next(v);
            } else {
                _count--;
            }
        }
    }, error, completed});
};