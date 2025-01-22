import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DigitalPersonalService } from './digital-personal.service';
import { CreateDigitalPersonalDto } from './dto/create-digital-personal.dto';
import { UpdateDigitalPersonalDto } from './dto/update-digital-personal.dto';
import { AcquisitionStarted, AcquisitionStopped, DeviceConnected, DeviceDisconnected, FingerprintReader, SampleFormat, SamplesAcquired } from '@digitalpersona/devices';
import { BioSample, BioFactor, BioSampleEncryption, BioSampleFormat, BioSampleFormatOwner, BioSampleHeader, Base64UrlString, BioSamplePurpose, BioSampleType, Credential, CredentialId, Answer, Answers, Base32, Base32String, Base64, Base64String, Base64Url, ClaimName, ClaimNames, ClaimSet, CredentialUsed, FaceImage, FaceImageType, HexString } from '@digitalpersona/core';
import { FingerprintsAuth, ContactlessCardAuth, EmailOtpAuth, FaceAuth, Finger, FingerPosition, Fingers, PasswordAuth, PinAuth, ProximityCardAuth, PushOtpAuth, SecurityQuestionsAuth, SmartCardAuth, SmsOtpAuth, TimeOtpAuth, U2FAuth, WindowsAuth } from '@digitalpersona/authentication';
import { ContactlessCardEnroll, EnrollmentContext, FaceEnroll, FingerprintsEnroll, PasswordEnroll, PinEnroll, ProximityCardEnroll, QuestionWithAnswer, SecurityQuestionsEnroll, SmartCardEnroll, SmartCardEnrollmentData, TimeOtpEnroll, U2FEnroll } from '@digitalpersona/enrollment'
import { ADAttributeName, AdminService, Attribute, AttributeAction, AttributeName, AuthService, AuthenticationData, AuthenticationHandle, AuthenticationStatus, ClaimRequest, ClaimsService, ContextualInfo, DatabaseType, EnrollService, ExtendedAuthResult, IAdminService, IAuthService, IAuthenticationClient, IClaimsService, IEnrollService, IPolicyService, ISecretService, IService, LDSAttributeName, LicenseInfo, LicenseType, PSKCOutput, Policy, PolicyElement, PolicyInfo, PolicyService, PolicyTrigger, ResourceActions, SearchQuery, SearchScope, SecretService, ServerSettingType, ServerSettings, ServiceError, ServiceFault, TriggerName, TriggerNames, UACFlags, UserAccountType, UserInfo, VarBlob, VarBool, VarData, VarInt, VarString, VarType } from '@digitalpersona/services'


@Controller('digital-personal')
export class DigitalPersonalController {
  constructor(private readonly digitalPersonalService: DigitalPersonalService,
    private readonly authService: AuthService
  ) { }

  /*   @Post()
    create(@Body() createDigitalPersonalDto: CreateDigitalPersonalDto) {
      return this.digitalPersonalService.create(createDigitalPersonalDto);
    } */

  @Post()
  async login(@Body() loginDto: { fingerprint: string }) {
    try {
      const fingerprintTemplate:any = Buffer.from(loginDto.fingerprint, 'base64');

      // Llamar al servicio de autenticación
      const result = await this.authService.ContinueAuthentication(1,fingerprintTemplate);

      if (result) {
        return { message: 'Autenticación exitosa' };
      } else {
        throw new HttpException('Autenticación fallida', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException('Error en autenticación', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
