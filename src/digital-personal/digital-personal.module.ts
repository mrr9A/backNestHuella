import { Module } from '@nestjs/common';
import { DigitalPersonalService } from './digital-personal.service';
import { DigitalPersonalController } from './digital-personal.controller';
import { FingerprintService } from 'src/services/fingerprint.service';
import { AcquisitionStarted, AcquisitionStopped, DeviceConnected, DeviceDisconnected, FingerprintReader, SampleFormat, SamplesAcquired } from '@digitalpersona/devices';
import { BioSample, BioFactor, BioSampleEncryption, BioSampleFormat, BioSampleFormatOwner, BioSampleHeader, Base64UrlString, BioSamplePurpose, BioSampleType, Credential, CredentialId, Answer, Answers, Base32, Base32String, Base64, Base64String, Base64Url, ClaimName, ClaimNames, ClaimSet, CredentialUsed, FaceImage, FaceImageType, HexString } from '@digitalpersona/core';
import { FingerprintsAuth, ContactlessCardAuth, EmailOtpAuth, FaceAuth, Finger, FingerPosition, Fingers, PasswordAuth, PinAuth, ProximityCardAuth, PushOtpAuth, SecurityQuestionsAuth, SmartCardAuth, SmsOtpAuth, TimeOtpAuth, U2FAuth, WindowsAuth } from '@digitalpersona/authentication';
import { ContactlessCardEnroll, EnrollmentContext, FaceEnroll, FingerprintsEnroll, PasswordEnroll, PinEnroll, ProximityCardEnroll, QuestionWithAnswer, SecurityQuestionsEnroll, SmartCardEnroll, SmartCardEnrollmentData, TimeOtpEnroll, U2FEnroll } from '@digitalpersona/enrollment'
import { ADAttributeName, AdminService, Attribute, AttributeAction, AttributeName, AuthService, AuthenticationData, AuthenticationHandle, AuthenticationStatus, ClaimRequest, ClaimsService, ContextualInfo, DatabaseType, EnrollService, ExtendedAuthResult, IAdminService, IAuthService, IAuthenticationClient, IClaimsService, IEnrollService, IPolicyService, ISecretService, IService, LDSAttributeName, LicenseInfo, LicenseType, PSKCOutput, Policy, PolicyElement, PolicyInfo, PolicyService, PolicyTrigger, ResourceActions, SearchQuery, SearchScope, SecretService, ServerSettingType, ServerSettings, ServiceError, ServiceFault, TriggerName, TriggerNames, UACFlags, UserAccountType, UserInfo, VarBlob, VarBool, VarData, VarInt, VarString, VarType } from '@digitalpersona/services'

@Module({
  controllers: [DigitalPersonalController],
  providers: [DigitalPersonalService,FingerprintService],
})
export class DigitalPersonalModule {}
