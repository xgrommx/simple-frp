import {curry} from '../utils';
import zipArray from './zipArray';

export default curry((fn, source1, source2) => zipArray(fn, [source1, source2]));