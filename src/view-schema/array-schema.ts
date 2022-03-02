import { propMaker } from '../helpers/prop-maker';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { propSchema } from './prop-schema';

// Make schema of a array
export function arraySchema(array: propMaker[]): SchemaObject {
  const schemas = array.map((type) => propSchema(type));
  if (schemas.length > 1)
    return {
      oneOf: schemas,
    };
  const [schema] = schemas;
  return {
    type: 'array',
    items: schema.properties ? schema.properties : schema,
  };
}
