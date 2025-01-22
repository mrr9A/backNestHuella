import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
    // Incrementar el límite del tamaño de la solicitud
    app.use(bodyParser.json({ limit: '16mb' })); // Cambia el tamaño según lo necesario
    app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }));
  /*   await app.listen(3000); */
  const port = process.env.PORT || 3000; // Usar el puerto dinámico asignado
  await app.listen(port);
  console.log(`App running on port ${port}`);
}
bootstrap();
