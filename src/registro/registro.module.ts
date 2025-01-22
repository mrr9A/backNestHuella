import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './entities/registro.entity';

@Module({
  controllers: [RegistroController],
  providers: [RegistroService],
  imports:[TypeOrmModule.forFeature([Registro])],
  exports: [TypeOrmModule]
})
export class RegistroModule {}
