import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ResponseObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { viewToSchema } from '@view-schema';
type viewType = Type | (Type | Type[])[];

interface apiResponseOptions extends Omit<ResponseObject, 'description'> {
  view?: viewType;
  status?: number | 'default';
  exception?: boolean;
  description?: string;
}
interface apiResponseView<T> {
  (type: viewType): MethodDecorator & ClassDecorator;
  (options: T): MethodDecorator & ClassDecorator;
}

export const ApiResponseView: apiResponseView<apiResponseOptions> = (
  ...args: (viewType | apiResponseOptions)[]
) => {
  let options: ApiResponseOptions = {
    schema: {},
  };
  const data = args[0];
  if (!Array.isArray(data) && typeof data === 'object') {
    const { view } = data;
    delete data.view;
    options = {
      schema: viewToSchema(view, 'normalizeResponse'),
      ...data,
    };
  } else {
    options.schema = viewToSchema(data, 'normalizeResponse');
  }
  return applyDecorators(ApiResponse(options));
};

function setOptions(
  [arg]: (viewType | apiResponseOptions)[],
  { status }: Pick<apiResponseOptions, 'status'>
) {
  return !Array.isArray(arg) && typeof arg === 'object'
    ? { ...arg, status }
    : { view: arg, status };
}
export const ApiOkResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.OK }));
export const ApiCreatedResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.CREATED }));
export const ApiAcceptedResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.ACCEPTED }));
export const ApiNoContentResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NO_CONTENT }));
export const ApiMovedPermanentlyResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.MOVED_PERMANENTLY }));
export const ApiFoundResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.FOUND }));
export const ApiBadRequestResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.BAD_REQUEST }));
export const ApiUnauthorizedResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.UNAUTHORIZED }));
export const ApiTooManyRequestsResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.TOO_MANY_REQUESTS }));
export const ApiNotFoundResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NOT_FOUND }));
export const ApiInternalServerErrorResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(
    setOptions(args, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  );
export const ApiBadGatewayResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.BAD_GATEWAY }));
export const ApiConflictResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.CONFLICT }));
export const ApiForbiddenResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.FORBIDDEN }));
export const ApiGatewayTimeoutResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.GATEWAY_TIMEOUT }));
export const ApiGoneResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.GONE }));
export const ApiMethodNotAllowedResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.METHOD_NOT_ALLOWED }));
export const ApiNotAcceptableResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NOT_ACCEPTABLE }));
export const ApiNotImplementedResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NOT_IMPLEMENTED }));
export const ApiPreconditionFailedResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.PRECONDITION_FAILED }));
export const ApiPayloadTooLargeResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.PAYLOAD_TOO_LARGE }));
export const ApiRequestTimeoutResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.REQUEST_TIMEOUT }));
export const ApiServiceUnavailableResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.SERVICE_UNAVAILABLE }));
export const ApiUnprocessableEntityResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(
    setOptions(args, { status: HttpStatus.UNPROCESSABLE_ENTITY })
  );
export const ApiUnsupportedMediaTypeResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(
    setOptions(args, { status: HttpStatus.UNSUPPORTED_MEDIA_TYPE })
  );
export const ApiDefaultResponseView: apiResponseView<
  Omit<apiResponseOptions, 'status'>
> = (...args: (viewType | apiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: 'default' }));
