import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DigitalPersonalService } from './digital-personal.service';
import { CreateDigitalPersonalDto } from './dto/create-digital-personal.dto';
import { UpdateDigitalPersonalDto } from './dto/update-digital-personal.dto';

@Controller('digital-personal')
export class DigitalPersonalController {
  constructor(private readonly digitalPersonalService: DigitalPersonalService) {}

  @Post()
  create(@Body() createDigitalPersonalDto: CreateDigitalPersonalDto) {
    return this.digitalPersonalService.create(createDigitalPersonalDto);
  }

  @Get()
  findAll() {
    return this.digitalPersonalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.digitalPersonalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDigitalPersonalDto: UpdateDigitalPersonalDto) {
    return this.digitalPersonalService.update(+id, updateDigitalPersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.digitalPersonalService.remove(+id);
  }
}
