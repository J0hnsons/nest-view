import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { view } from '..';

/**
 * Create a pipe to validate a body based on gived view
 *
 * @param type View class
 * @returns Pipe used to validate a body
 */
export function validateView(type: Type | Type[]) {
  return class ValidateViewPipe
    implements PipeTransform<any, Promise<typeof type>>
  {
    async transform(
      value: any,
      _metadata: ArgumentMetadata
    ): Promise<typeof type> {
      if (Array.isArray(type) && type.length > 1)
        return this.ifOneReturn(type.map((item) => this.try(item, value)));
      return this.ifOneReturn([this.try(type, value)]);
    }
    async ifOneReturn(attempts: (HttpException | any)[]) {
      for (const attempt of attempts) {
        if (!(attempt instanceof HttpException)) return attempt;
      }
      throw new HttpException(
        `Data did not please any view: [${(type as Type[])
          .map(({ name }) => name)
          .join(',')}]`,
        HttpStatus.BAD_REQUEST
      );
    }
    async try(_view: Type | (Type | Type[])[], value: any) {
      const createView = async () => view(_view, value);
      return createView().catch((err) => err);
    }
  };
}
