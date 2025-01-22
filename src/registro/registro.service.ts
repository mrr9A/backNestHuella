import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './entities/registro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(Registro)
    private registroRepository: Repository<Registro>,
  ) { }

  async create(createRegistroDto: CreateRegistroDto) {
    try {
      const registro = this.registroRepository.create({
        ...createRegistroDto
      });
      console.log('Datos recibidos:', createRegistroDto);

      return await this.registroRepository.save(registro);
    } catch (error) {
      console.error('Error al crear registro:', error);
      throw new InternalServerErrorException('Error al crear registro');
    } 
  }

  async findAll(): Promise<Registro[]> {
    try {
      return await this.registroRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los roles');
    }
  }

  async findOne(id: number): Promise<Registro> {
    const registro = await this.registroRepository.findOne({ where: { id } });
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return registro;
  }

  async update(id: number, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    const registro = await this.findOne(id);
    Object.assign(registro, updateRegistroDto);
    return await this.registroRepository.save(registro);
  }

  async remove(id: number): Promise<void> {
    const registro = await this.findOne(id);
    await this.registroRepository.remove(registro);
  }

}
