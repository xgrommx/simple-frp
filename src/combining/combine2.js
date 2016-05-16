import {curry} from '../utils';
import combineArray from './combineArray';

export default curry((fn, s1, s2) => combineArray(fn, [s1, s2]));