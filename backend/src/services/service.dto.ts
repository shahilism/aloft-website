import { ApiProperty } from '@nestjs/swagger';

class ServiceImageDto {
  @ApiProperty({ example: '/images/service-ducting.jpg' })
  src: string;

  @ApiProperty()
  alt: string;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;
}

export class ServiceDto {
  @ApiProperty({ example: 'hvac-ducting' })
  slug: string;

  @ApiProperty({ example: 'Ductable AC & ducting' })
  name: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  headline: string;

  @ApiProperty()
  intro: string;

  @ApiProperty({ type: [String] })
  covers: string[];

  @ApiProperty()
  cta: string;

  @ApiProperty()
  seoTitle: string;

  @ApiProperty()
  metaDescription: string;

  @ApiProperty({ example: '/services/hvac-ducting' })
  path: string;

  @ApiProperty({ type: ServiceImageDto })
  image: ServiceImageDto;
}

class CountMeta {
  @ApiProperty()
  count: number;
}

export class ServiceListResponse {
  @ApiProperty({ type: [ServiceDto] })
  data: ServiceDto[];

  @ApiProperty({ type: CountMeta })
  meta: CountMeta;
}

export class ServiceResponse {
  @ApiProperty({ type: ServiceDto })
  data: ServiceDto;
}
