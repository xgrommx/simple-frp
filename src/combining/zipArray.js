import {noop, curry, map} from '../utils';
import {K, I} from '../combinators';
import disposable from '../disposable';

export default curry((fn, sources, {next = noop, error = noop, completed = noop}) => {
    let values = map(K([]))(sources);
    let done = map(K(false))(sources);
    let disposed = false;

    const _next = (i) => {
        if(values.every(x => x.length > 0)) {
            next(fn(...values.map(x => x.shift())));
        } else if(done.filter((x, j) => j !== i).every(I) && !disposed) {
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