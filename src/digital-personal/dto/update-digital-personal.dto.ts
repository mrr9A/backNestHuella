import { PartialType } from '@nestjs/mapped-types';
import { CreateDigitalPersonalDto } from './create-digital-personal.dto';

export class UpdateDigitalPersonalDto extends PartialType(CreateDigitalPersonalDto) {}
