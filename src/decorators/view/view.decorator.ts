import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Type } from '@nestjs/common';
import { symbols } from '@helpers/enums/view-symbols';

export class ViewOptions {
  /**
   * Set a pattern to all received body
   *
   * @param view A Processed view return
   */
  normalizeBody?: (view: SchemaObject) => SchemaObject;
  /**
   * Set a pattern to all app responses
   *
   * @param view A Processed view return
   */
  normalizeResponse?: (view: SchemaObject) => SchemaObject;
  /**
   * Set a pattern to all app exceptions
   *
   * @param view A Processed view return
   */
  normalizeException?: (view: SchemaObject) => SchemaObject;
}

export function View(options: ViewOptions = {}) {
  return (target: any) => {
    target = Reflect.decorate(
      [
        Reflect.metadata(symbols.view, true),
        Reflect.metadata(symbols.options, options),
        (target: Type) => {
          return class extends target {
            [symbols.propsKey]() {
              return Reflect.ownKeys(target.prototype).filter(
                (key) => !['constructor', symbols.propsKey].includes(key)
              );
            }
          };
        },
      ],
      target
    );
    return target;
  };
}
