import {curry, noop} from '../utils';

export default curry((source, {
    next = noop,
    error = noop,
    completed = noop
}) => {
    let lastValue = null;

    return source({next: v => {
        lastValue = v;
    }, error, completed: () => {
        next(lastValue);
        completed();
    }})
});