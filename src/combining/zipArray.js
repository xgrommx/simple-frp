import {noop, curry} from '../utils';
import disposable from '../disposable';

export default curry((fn, sources, {next = noop, error = noop, completed = noop}) => {
    let values = sources.map(_ => []);
    let done = sources.map(_ => false);
    let disposed = false;

    const _next = (i) => {
        if(values.every(x => x.length > 0)) {
            next(fn(...values.map(x => x.shift())));
        } else if(done.filter((x, j) => j !== i).every(x => x) && !disposed) {
            completed();
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
                if(!disposed) {
                    values[i].push(v);
                    _next(i);
                }
            },
            error: e => {
                if(!disposed) {
                    disposed = true;
                    error(e)
                }
            },
            completed: () => {
                _completed(i);
            }
        });
    }));
});