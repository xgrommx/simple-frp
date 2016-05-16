import {curry, noop} from '../utils';

export default curry((predicate, source, {
    next = noop,
    error = noop,
    completed = noop
}) => source({next: v => predicate(v) && next(v), error, completed}));