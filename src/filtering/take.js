import {noop} from '../utils';

export default count => source => ({next = noop, error = noop, completed = noop}) => {
    let _count = 0;
    let disposed = false;
    let subscription = source({next: v => {
        if(!disposed) {
            next(v);
            _count++;
            if(_count === count) {
                disposed = true;
                subscription && subscription();
                completed();
            }
        }
    }, error, completed});

    return subscription;
};