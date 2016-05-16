import {noop} from '../utils';

// defer :: (void -> Stream a) -> Stream a
export default fn => ({next = noop, error = noop, completed = noop}) => {
    return fn()({
        next,
        error,
        completed
    })
};