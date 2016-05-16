import {noop, curry} from '../utils';
import disposable from '../disposable';

export default curry((fn, sources, {next = noop, error = noop, completed = noop}) => {
    let disposed = false;
    let values = [];
    let hasValue = sources.map(_ => false);
    let done = sources.map(_ => false);

    const _next = (v, i) => {
        hasValue[i] = true;
        values[i] = v;
        if(hasValue.every(x => x === true)) {
            !disposed && next(fn(...values));
        }
    };

    const _completed = (i) => {
        done[i] = true;

        if(done.every(x => x === true)) {
            !disposed && completed();
        }
    };

    return disposable(sources.map((s, i) => {
        return s({
            next: v => {
                _next(v, i);
            },
            error: e => {
                if(!disposable) {
                    disposed = true;
                    error(e);
                }
            },
            completed: () => {
                _completed(i);
            }
        });
    }));
});