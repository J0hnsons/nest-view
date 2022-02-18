import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiBodyOptions } from '@nestjs/swagger';
import {
  ExamplesObject,
  RequestBodyObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { viewToSchema } from '@view-schema';
type viewType = Type | (Type | Type[])[];

interface apiBodyOptions extends RequestBodyObject {
  view: viewType;
  enum?: SwaggerEnumType;
  examples?: ExamplesObject;
}
interface apiBodyView {
  (type: viewType): MethodDecorator & ClassDecorator;
  (options: apiBodyOptions): MethodDecorator & ClassDecorator;
}
export const ApiBodyView: apiBodyView = (...args: any[]) => {
  let options: ApiBodyOptions = {
    schema: {},
  };
  const data = args[0];
  if (!(data instanceof Array) && typeof data === 'object') {
    const { view } = data;
    delete data.view;
    options = {
      schema: viewToSchema(view, 'normalizeBody'),
      ...data,
    };
  } else {
    options.schema = viewToSchema(data, 'normalizeBody');
  }
  return applyDecorators(ApiBody(options));
};
