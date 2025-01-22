import { Module } from '@nestjs/common';
import { DigitalPersonalService } from './digital-personal.service';
import { DigitalPersonalController } from './digital-personal.controller';
import { FingerprintService } from 'src/services/fingerprint.service';

@Module({
  controllers: [DigitalPersonalController],
  providers: [DigitalPersonalService,FingerprintService],
})
export class DigitalPersonalModule {}
