import { propMaker } from '@helpers/prop-maker';
import { getDatabyKeyOrPath, viewLog } from '.';
import { propView } from './prop-view';

//Format gived data like a array view structure
export function arrayView([type]: propMaker[], _data: any, _viewLog: viewLog) {
  return (Array.isArray(_data) ? _data : [_data]).map((_, index) => {
    const { data, viewLog } = getDatabyKeyOrPath(_data, index, _viewLog);
    return propView(type, data, viewLog);
  });
}
