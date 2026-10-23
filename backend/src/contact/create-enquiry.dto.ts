import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  buildingTypeValues,
  enquiryLimits as L,
  enquiryServiceValues,
  phonePattern,
  projectStageValues,
  type BuildingType,
  type EnquiryPayload,
  type EnquiryService,
  type ProjectStage,
} from '@aloft/content';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value);
const trimMultiline = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : value;
const emptyToUndefined = ({ value }: { value: unknown }) => {
  const v = trim({ value });
  return v === '' ? undefined : v;
};

/** No control characters in single-line fields (prevents header/log injection). */
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const SINGLE_LINE = /^[^\u0000-\u001F\u007F]*$/;
/** Multi-line text may contain line breaks and tabs, but no other control characters. */
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const MULTI_LINE = /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/;

export class CreateEnquiryDto implements EnquiryPayload {
  @ApiProperty({ example: 'Anil Kumar', minLength: L.fullName.min, maxLength: L.fullName.max })
  @Transform(trim)
  @IsString()
  @Matches(SINGLE_LINE, { message: 'Full name contains invalid characters.' })
  @Length(L.fullName.min, L.fullName.max, { message: 'Enter your full name.' })
  fullName: string;

  @ApiPropertyOptional({ example: 'Example Developers Pvt Ltd', maxLength: L.companyName.max })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  @MaxLength(L.companyName.max)
  @Matches(SINGLE_LINE, { message: 'Company name contains invalid characters.' })
  companyName?: string;

  @ApiProperty({ example: 'facilities@example.com', maxLength: L.email.max })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @MaxLength(L.email.max)
  @IsEmail({}, { message: 'Enter a valid business email address.' })
  email: string;

  @ApiProperty({ example: '+91 95449 27508' })
  @Transform(trim)
  @IsString()
  @Matches(phonePattern, { message: 'Enter a valid phone number.' })
  @Length(L.phone.min, L.phone.max, { message: 'Enter a valid phone number.' })
  phone: string;

  @ApiProperty({ example: 'Perinthalmanna, Malappuram' })
  @Transform(trim)
  @IsString()
  @Matches(SINGLE_LINE, { message: 'Project location contains invalid characters.' })
  @Length(L.projectLocation.min, L.projectLocation.max, { message: 'Enter the project location.' })
  projectLocation: string;

  @ApiProperty({ enum: enquiryServiceValues })
  @IsIn(enquiryServiceValues, { message: 'Select the service required.' })
  service: EnquiryService;

  @ApiProperty({ enum: buildingTypeValues })
  @IsIn(buildingTypeValues, { message: 'Select the building type.' })
  buildingType: BuildingType;

  @ApiPropertyOptional({ example: '18,000 sq ft', maxLength: L.approxArea.max })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  @MaxLength(L.approxArea.max)
  @Matches(SINGLE_LINE, { message: 'Approximate area contains invalid characters.' })
  approxArea?: string;

  @ApiProperty({ enum: projectStageValues })
  @IsIn(projectStageValues, { message: 'Select the project stage.' })
  projectStage: ProjectStage;

  @ApiProperty({ minLength: L.message.min, maxLength: L.message.max })
  @Transform(trimMultiline)
  @IsString()
  @Matches(MULTI_LINE, { message: 'Message contains invalid characters.' })
  @IsNotEmpty({ message: 'Tell us about your project requirements.' })
  @Length(L.message.min, L.message.max, {
    message: `Message must be between ${L.message.min} and ${L.message.max} characters.`,
  })
  message: string;

  @ApiPropertyOptional({ example: '/services/hvac-amc' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Matches(/^\/[A-Za-z0-9\-._~/?=&%]*$/, { message: 'sourcePath must be a site path.' })
  sourcePath?: string;

  @ApiPropertyOptional({ description: 'Honeypot. Leave empty.' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;

  @ApiPropertyOptional({ description: 'Epoch milliseconds when the form was rendered.' })
  @IsOptional()
  @IsInt()
  startedAt?: number;
}

export class EnquiryReceipt {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  receivedAt: string;
}

export class EnquiryReceiptResponse {
  @ApiProperty({ type: EnquiryReceipt })
  data: EnquiryReceipt;
}
