import { maker } from '@helpers';
import { propMaker } from '@helpers/prop-maker';
import { Type } from '@nestjs/common';
import { arrayView } from './array-view';
import { propView } from './prop-view';

export interface viewLog {
  keyPath: string;
  viewName: string;
}

function setViewLog(newKey: string | number, viewLog: viewLog): viewLog {
  if (!newKey) return viewLog;
  return {
    ...viewLog,
    keyPath: [viewLog.keyPath, newKey].filter((key) => key).join('.'),
  };
}
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
export function getDatabyKeyOrPath(
  data: any,
  key: string | number,
  viewLog: viewLog,
  config?: propMaker['config']
) {
  if (config?.path) {
    const dataByPath = getDataByPath(data, config.path);
    if (dataByPath)
      return { data: dataByPath, viewLog: setViewLog(key, viewLog) };
    if (!key) return { data, viewLog };
  }
  return { data: data?.[key], viewLog: setViewLog(key, viewLog) };
}

export function view<T=any>(view: Type | (Type | Type[])[], data: any): T {
  const viewObject = maker(view);
  const viewLog: viewLog = {
    viewName: (<Function>view).name,
    keyPath: '',
  };
  if (Array.isArray(viewObject)) return arrayView(viewObject, data, viewLog);
  return propView(viewObject, data, viewLog);
}
