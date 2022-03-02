import { maker } from '../helpers';
import { propMaker } from '../helpers/prop-maker';
import { Type } from '@nestjs/common';
import { arrayView } from './array-view';
import { propView } from './prop-view';

export interface ViewLog {
  keyPath: string;
  viewName: string;
}

// Log object used to show information if error occur when create a object
function setViewLog(newKey: string | number, viewLog: ViewLog): ViewLog {
  if (!newKey) return viewLog;
  return {
    ...viewLog,
    keyPath: [viewLog.keyPath, newKey].filter((key) => key).join('.'),
  };
}
// Get data in object by the gived path
export function getDataByPath(data: any, path: string | string[]) {
  for (const p of Array.isArray(path) ? path : [path]) {
    let aux = Object.assign({}, data);
    for (const key of p.split('.')) {
      aux = aux?.[key];
    }
    if (aux) return aux;
  }
  return null;
}

// Get data of a variable in object
// If variable have path set in config try to get data by the gived path
// If don`t have a path or path dont return a value, data will be get by the key
export function getDatabyKeyOrPath(
  data: any,
  key: string | number,
  viewLog: ViewLog,
  config?: propMaker['config'],
) {
  if (config?.path) {
    const dataByPath = getDataByPath(data, config.path);
    if (dataByPath)
      return { data: dataByPath, viewLog: setViewLog(key, viewLog) };
    if (!key) return { data, viewLog };
  }
  return { data: data?.[key], viewLog: setViewLog(key, viewLog) };
}

/**
 *
 * @param view
 * @param data
 * @returns
 */
export function view<T = any>(
  viewType: Type | (Type | Type[])[],
  data: any,
): T {
  const viewObject = maker(viewType);
  const viewLog: ViewLog = {
    viewName: (viewType as Type).name,
    keyPath: '',
  };
  if (Array.isArray(viewObject)) return arrayView(viewObject, data, viewLog);
  return propView(viewObject, data, viewLog);
}
