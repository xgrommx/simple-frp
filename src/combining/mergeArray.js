import {curry, noop} from '../utils';
import disposable from '../disposable';

export default curry((sources, {next = noop, error = noop, completed = noop}) => {
    let count = sources.length;

    return disposable(sources.map(source => {
        return source({next: v => next(v), error, completed: () => {
            (count-- === 0) && completed();
        }});
    }));
});