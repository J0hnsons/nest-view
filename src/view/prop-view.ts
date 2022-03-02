import { constructors } from '../decorators/view';
import { propMaker } from '../helpers/prop-maker';
import { ViewLog } from '.';
import { arrayView } from './array-view';
import { objectView } from './object-view';

// Convert variable data to correct variable type
function convertData(type: constructors, data: any) {
  if (type === Date) return new Date(data);
  if (type === Boolean)
    return ![null, undefined, NaN, '', 'false'].includes(data);
  return type(data);
}

// Throw an error if data is required and variable dont have value
function verifyData(
  data: any,
  required: boolean,
  { keyPath, viewName }: ViewLog,
) {
  if ([null, undefined, NaN, '', 'false'].includes(data) && required) {
    throw new Error(`Missing "${keyPath}" in "${viewName}"`);
  }
}

// Set formated variable data
export function propView(
  { type, config }: propMaker,
  data: any,
  viewLog: ViewLog,
) {
  verifyData(data, config?.required, viewLog);
  if (Array.isArray(type)) {
    return arrayView(type as any[], data, viewLog);
  }
  if (typeof type === 'function') return convertData(type, data);
  return objectView(type, data, viewLog);
}
