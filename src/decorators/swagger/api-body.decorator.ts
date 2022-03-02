/* tslint:disable */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiBodyOptions } from '@nestjs/swagger';
import {
  ExamplesObject,
  RequestBodyObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { viewToSchema } from '../../view-schema';
type ViewType = Type | (Type | Type[])[];
interface ApiBodyViewOptions extends RequestBodyObject {
  /**
   * View class
   */
  view: ViewType;

  enum?: SwaggerEnumType;
  examples?: ExamplesObject;
}
interface ApiBodyView {
  /**
   * Decorate a method creating schema of body view
   * @param type View class
   */
  (type: ViewType): MethodDecorator & ClassDecorator;

  /**
   * Decorate a method creating schema of body view
   * @param options Options to create a schema
   */
  (options: ApiBodyViewOptions): MethodDecorator & ClassDecorator;
}
export const ApiBodyView: ApiBodyView = (...args: any[]) => {
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
