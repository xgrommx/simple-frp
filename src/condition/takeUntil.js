import {noop} from '../utils';
import disposable from '../disposable';

export default other => source => ({next = noop, error = noop, completed = noop}) => {
    let disposed = false;

    let disposables = disposable([
        source({next: v => !disposed && next(v), error, completed}),
        other({next: () => {
            if(!disposed) {
                disposed = true;
                disposables();
                completed();
            }
        }, error, completed: () => {}})
    ]);

    return disposables;
};