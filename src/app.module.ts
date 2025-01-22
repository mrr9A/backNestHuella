import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroModule } from './registro/registro.module';
import { DigitalPersonalModule } from './digital-personal/digital-personal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Configuración global
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'registrohuella',
      autoLoadEntities: true,
      synchronize: true,
    }), RegistroModule, DigitalPersonalModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
