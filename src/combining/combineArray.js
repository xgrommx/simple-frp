import {noop, curry, map} from '../utils';
import {K} from '../combinators';
import disposable from '../disposable';

export default curry((fn, sources, {next = noop, error = noop, completed = noop}) => {
    let disposed = false;
    let values = [];
    let hasValue = map(K(false))(sources);
    let done = map(K(false))(sources);
    
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