import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ResponseObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { viewToSchema } from '../../view-schema';
type viewType = Type | (Type | Type[])[];

interface ApiResponseViewOptions extends Omit<ResponseObject, 'description'> {
  view?: viewType;
  status?: number | 'default';
  exception?: boolean;
  description?: string;
}
interface ApiResponseView<T> {
  /**
   * Decorate a method creating schema of response view
   * @param type View class
   */
  (type: viewType): MethodDecorator & ClassDecorator;

  /**
   * Decorate a method creating schema of response view
   * @param options Options to create a schema
   */
  (options: T): MethodDecorator & ClassDecorator;
}

export const ApiResponseView: ApiResponseView<ApiResponseViewOptions> = (
  ...args: (viewType | ApiResponseViewOptions)[]
) => {
  let options: ApiResponseOptions = {
    schema: {},
  };
  const data = args[0];
  if (!Array.isArray(data) && typeof data === 'object') {
    const { view } = data;
    delete data.view;
    options = {
      schema: viewToSchema(
        view,
        data.exception ? 'patternException' : 'patternResponse',
      ),
      ...data,
    };
  } else {
    options.schema = viewToSchema(data, 'patternResponse');
  }
  return applyDecorators(ApiResponse(options));
};

function setOptions(
  [arg]: (viewType | ApiResponseViewOptions)[],
  { status }: Pick<ApiResponseViewOptions, 'status'>,
) {
  return !Array.isArray(arg) && typeof arg === 'object'
    ? { ...arg, status }
    : { view: arg, status };
}
export const ApiOkResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.OK }));
export const ApiCreatedResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.CREATED }));
export const ApiAcceptedResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.ACCEPTED }));
export const ApiNoContentResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NO_CONTENT }));
export const ApiMovedPermanentlyResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.MOVED_PERMANENTLY }));
export const ApiFoundResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.FOUND }));
export const ApiBadRequestResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.BAD_REQUEST }));
export const ApiUnauthorizedResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.UNAUTHORIZED }));
export const ApiTooManyRequestsResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.TOO_MANY_REQUESTS }));
export const ApiNotFoundResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NOT_FOUND }));
export const ApiInternalServerErrorResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(
    setOptions(args, { status: HttpStatus.INTERNAL_SERVER_ERROR }),
  );
export const ApiBadGatewayResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.BAD_GATEWAY }));
export const ApiConflictResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.CONFLICT }));
export const ApiForbiddenResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.FORBIDDEN }));
export const ApiGatewayTimeoutResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.GATEWAY_TIMEOUT }));
export const ApiGoneResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.GONE }));
export const ApiMethodNotAllowedResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.METHOD_NOT_ALLOWED }));
export const ApiNotAcceptableResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NOT_ACCEPTABLE }));
export const ApiNotImplementedResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.NOT_IMPLEMENTED }));
export const ApiPreconditionFailedResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.PRECONDITION_FAILED }));
export const ApiPayloadTooLargeResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.PAYLOAD_TOO_LARGE }));
export const ApiRequestTimeoutResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.REQUEST_TIMEOUT }));
export const ApiServiceUnavailableResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: HttpStatus.SERVICE_UNAVAILABLE }));
export const ApiUnprocessableEntityResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(
    setOptions(args, { status: HttpStatus.UNPROCESSABLE_ENTITY }),
  );
export const ApiUnsupportedMediaTypeResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(
    setOptions(args, { status: HttpStatus.UNSUPPORTED_MEDIA_TYPE }),
  );
export const ApiDefaultResponseView: ApiResponseView<
  Omit<ApiResponseOptions, 'status'>
> = (...args: (viewType | ApiResponseOptions)[]) =>
  ApiResponseView(setOptions(args, { status: 'default' }));
