import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Type } from '@nestjs/common';
import { symbols } from '../../helpers/enums/view-symbols';

export interface ViewOptions {
  /**
   * Set a pattern to all received body
   *
   * @param view A Processed view return
   */
  patternBody?: (view: SchemaObject) => SchemaObject;
  /**
   * Set a pattern to all app responses
   *
   * @param view A Processed view return
   */
  patternResponse?: (view: SchemaObject) => SchemaObject;
  /**
   * Set a pattern to all app exceptions
   *
   * @param view A Processed view return
   */
  patternException?: (view: SchemaObject) => SchemaObject;
}

/**
 * Decorator that set class as a view
 *
 * @param options Possible options to create a view
 * @returns Decorate function of a view
 */
export function View(options: ViewOptions = {}) {
  return (target: any) => {
    target = Reflect.decorate(
      [
        Reflect.metadata(symbols.view, true),
        Reflect.metadata(symbols.options, options),
        (t: any) => {
          return class extends t {
            [symbols.propsKey]() {
              return Reflect.ownKeys(t.prototype).filter(
                (key) => !['constructor', symbols.propsKey].includes(key),
              );
            }
          };
        },
      ],
      target,
    );
    return target;
  };
}
