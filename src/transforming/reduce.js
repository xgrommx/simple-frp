import {curry, compose} from '../utils';
import last from '../filtering/last';
import scan from './scan';

// reduce :: (a -> b -> b) -> b -> Stream a -> Stream b
export default curry((acc, seed, source) => compose(last(), scan(acc, seed))(source));