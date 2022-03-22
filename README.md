# Nest View

Nest view is a module created to make easy data manipulation inside an application based on [NestJS](https://nestjs.com).

## Instalation

This module is available in [npm registry](https://www.npmjs.com/).

### Dependencies

- [NestJS](https://docs.nestjs.com)
- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)

The first step to use this module is create a simple application based on [NestJS](https://docs.nestjs.com).

Next step: install [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) in your application.

Now just install the module using npm command

```
$ npm install nest-view
```

## Features

- Create views to manipulate data
- Use view to validate data
- Use views to make schemas to use in nestJS swagger documentation

## Usage

The first step to use this module is to create a view

### View example

---

```typescript
import { PropView, View } from 'nest-view';

@View()
export class Example {
  @PropView({ type: String })
  name: string;

  @PropView({ type: Number })
  age: number;
}
```

Now you're able to use this view to manipulate data and use to document your request's in swagger.

### Swagger documentation

---

```typescript
import { Body, Controller, Get } from '@nestjs/common';
import { ApiBodyView } from 'nest-view';
import { Example } from './view';

@Controller()
export class AppController {
  @Get()
  @ApiBodyView(Example)
  getHello(@Body() body: Example) {
    return;
  }
}
```
