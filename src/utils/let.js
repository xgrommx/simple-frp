import {curry} from '../utils';

// let :: (Stream a -> Stream b) -> Stream a -> Stream b
export default curry((fn, source) => {
    return fn(source);
});