import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function swagger(app: INestApplication) {
  const swaggerDocument = new DocumentBuilder()
    .setTitle('Login')
    .setDescription("Microservice route's documentation")
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocument);

  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);
  await app.listen(3000);
}
bootstrap();
