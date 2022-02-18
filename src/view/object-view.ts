import { propMaker } from '@helpers/prop-maker';
import { getDatabyKeyOrPath, viewLog } from '.';
import { propView } from './prop-view';

export function objectView(
  _type: Record<string, propMaker>,
  _data: any,
  _viewLog: viewLog
) {
  const result = {};
  for (const [key, type] of Object.entries(_type)) {
    const { data, viewLog } = getDatabyKeyOrPath(
      _data,
      key,
      _viewLog,
      type.config
    );
    result[key] = propView(type, data, viewLog);
  }
  return result;
}
