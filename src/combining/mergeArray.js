import {curry, noop, length} from '../utils';
import disposable from '../disposable';

export default curry((sources, {next = noop, error = noop, completed = noop}) => {
    let count = length(sources);

    return disposable(sources.map(source => {
        return source({next: v => next(v), error, completed: () => {
            (count-- === 0) && completed();
        }});
    }));
});