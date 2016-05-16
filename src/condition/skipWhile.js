import {curry, noop} from '../utils';

export default curry((predicate, source, {next = noop, error = noop, completed = noop}) => {
    let disposed = false;

    return source({
        next: v => {
            if(!disposed) {
                if(!predicate(v)) {
                    next(v);
                }
            }
        },
        error,
        completed
    });
});