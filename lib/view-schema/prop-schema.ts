import { propMaker } from '../helpers/prop-maker';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { arraySchema } from './array-schema';
import { objectSchema } from './object-schema';

// Set schema type of non-object variable
function setType(type: () => void) {
  if (type === Date)
    return {
      type: 'string',
      format: 'date-time',
    };
  return {
    type: type.name.toLowerCase(),
  };
}

// Make schema of a gived variable object
export function propSchema({ type, config }: propMaker): SchemaObject {
  const { path, required, ...options } = config;
  if (Array.isArray(type)) {
    return {
      ...arraySchema(type as any[]),
      ...options,
    };
  }
  if (typeof type === 'function') {
    return {
      ...setType(type),
      ...options,
    };
  }
  return {
    ...objectSchema(type as Record<string, propMaker>),
    ...options,
  };
}
