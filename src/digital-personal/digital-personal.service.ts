import { Injectable } from '@nestjs/common';
import { CreateDigitalPersonalDto } from './dto/create-digital-personal.dto';
import { UpdateDigitalPersonalDto } from './dto/update-digital-personal.dto';

@Injectable()
export class DigitalPersonalService {
  create(createDigitalPersonalDto: CreateDigitalPersonalDto) {
    return 'This action adds a new digitalPersonal';
  }

  findAll() {
    return `This action returns all digitalPersonal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} digitalPersonal`;
  }

  update(id: number, updateDigitalPersonalDto: UpdateDigitalPersonalDto) {
    return `This action updates a #${id} digitalPersonal`;
  }

  remove(id: number) {
    return `This action removes a #${id} digitalPersonal`;
  }
}
