import {curry, noop} from '../utils';
import disposable from '../disposable';

export default curry((skipper, source, {next = noop, error = noop, completed = noop}) => {
    let disposed = false;
    let isEmitted = false;
    let skipperSubscription = null;

    return disposable([
        source({
            next: v => {
                if(!disposed) {
                    isEmitted && next(v);
                }
            },
            error,
            completed: () => {
                if(!disposed) {
                    isEmitted && completed();
                }
            }
        }),
        (skipperSubscription = skipper({
            next: () => {
                isEmitted = true;
                skipperSubscription && skipperSubscription();
            },
            error,
            completed: () => {
                skipperSubscription && skipperSubscription();
            }
        }), skipperSubscription)
    ]);
});