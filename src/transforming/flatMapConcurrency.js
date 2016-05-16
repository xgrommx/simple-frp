import disposable from '../disposable';
import {noop, curry} from '../utils';

// flatMapConcurrency :: Number -> (a -> Stream b) -> Stream a -> Stream b
export default curry((concurrency, fn, sources) => ({next = noop, error = noop, completed = noop}) => {
    let active = 0;
    let disposables = [];
    let finishParent = false;
    let queue = [];
    let subscription = null;
    let disposed = false;

    let innerSubscribe = (innerSource) => {
        let innerSubscription = fn(innerSource)({
            next: v => {
                if(!disposed) {
                    next(v)
                }
            },
            error: e => {
                if (!disposed) {
                    disposed = true;
                    error(e);
                }
            },
            completed: () => {
                if (!disposed) {
                    innerSubscription && innerSubscription(); // dispose
                    let index = disposables.indexOf(innerSubscription);
                    disposables.splice(index, 1);

                    if (queue.length > 0) {
                        innerSubscribe(queue.shift());
                    } else {
                        active--;
                        if (finishParent && active === 0) {
                            completed();
                        }
                    }
                }
            }
        });

        disposables.push(innerSubscription);
    };

    subscription = sources({
        next: innerSource => {
            if (!disposed) {
                if (active < concurrency) {
                    active++;
                    innerSubscribe(innerSource);
                } else {
                    queue.push(innerSource);
                }
            }
        },
        error: e => {
            if (!disposed) {
                disposed = true;
                error(e);
            }
        },
        completed: () => {
            finishParent = true;
            if (active === 0 && !disposed) {
                disposed = true;
                subscription && subscription();
                completed();
            }
        }
    });

    return disposable([subscription, ...disposables], () => {
        disposed = true;
    });
});
