import { possibleTypes } from '@decorators/view';
import { propMaker } from '@helpers/prop-maker';
import { viewLog } from '.';
import { arrayView } from './array-view';
import { objectView } from './object-view';

//TODO: Make path work

function convertData(type: possibleTypes, data: any) {
  if (type == Date) return new Date(data);
  if (type == Boolean)
    return ![null, undefined, NaN, '', 'false'].includes(data);
  return type(data);
}

function verifyData(
  data: any,
  required: boolean,
  { keyPath, viewName }: viewLog
) {
  if ([null, undefined, NaN, '', 'false'].includes(data) && required) {
    throw new Error(`Missing "${keyPath}" in "${viewName}"`);
  }
}

export function propView(
  { type, config }: propMaker,
  data: any,
  viewLog: viewLog
) {
  verifyData(data, config?.required, viewLog);
  if (Array.isArray(type)) {
    return arrayView(type as any[], data, viewLog);
  }
  if (typeof type === 'function') return convertData(type, data);
  return objectView(type, data, viewLog);
}
