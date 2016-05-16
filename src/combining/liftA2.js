import {curry, flip, compose} from '../utils';
import of from '../creation/of';
import ap from '../combining/ap';

export default curry((fn, s1, s2) => compose(flip(ap)(s2), flip(ap)(s1))(of(fn))); 
