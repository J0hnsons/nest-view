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
  /**
   * View class
   */
  view: viewType;

  enum?: SwaggerEnumType;
  examples?: ExamplesObject;
}
interface apiBodyView {
  /**
   * Decorate a method creating schema of body view
   * @param type View class
   */
  (type: viewType): MethodDecorator & ClassDecorator;

  /**
   * Decorate a method creating schema of body view
   * @param options Options to create a schema
   */
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
      schema: viewToSchema(view, 'patternBody'),
      ...data,
    };
  } else {
    options.schema = viewToSchema(data, 'patternBody');
  }
  return applyDecorators(ApiBody(options));
};
