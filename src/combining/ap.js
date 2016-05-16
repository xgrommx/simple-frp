import {curry} from '../utils';
import combine2 from './combine2';

export default curry((fns, s) => combine2((fn, v) => fn(v), fns, s));