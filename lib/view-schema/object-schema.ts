import { propMaker } from '../helpers/prop-maker';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { propSchema } from './prop-schema';

// Make schema of a object
export function objectSchema(type: Record<string, propMaker>): SchemaObject {
  const result = {};
  for (const [key, data] of Object.entries(type)) {
    result[key] = propSchema(data);
  }
  return {
    type: 'object',
    properties: result,
  };
}
