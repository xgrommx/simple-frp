import {curry, noop} from '../utils';

export default curry((predicate, source, {next = noop, error = noop, completed = noop}) => {
    let disposed = false;

    let subscription = source({
        next: v => {
            if(!disposed) {
                if(predicate(v)) {
                    next(v);
                } else {
                    disposed = true;
                    subscription && subscription();
                    completed();
                }
            }
        },
        error,
        completed
    });

    return subscription;
});