import {curry, compose} from '../utils';
import {C} from '../combinators';
import of from '../creation/of';
import ap from '../combining/ap';

export default curry((fn, s1, s2) => compose(C(ap)(s2), C(ap)(s1))(of(fn))); 
