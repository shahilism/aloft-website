import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Matches, MaxLength } from 'class-validator';

export class ListProjectsQuery {
  @ApiPropertyOptional({ description: 'Filter by related service page slug', example: 'vrf-vrv-systems' })
  @IsOptional()
  @MaxLength(60)
  @Matches(/^[a-z0-9-]+$/, { message: 'service must be a service slug' })
  service?: string;
}

class ProjectImageDto {
  @ApiProperty() url: string;
  @ApiProperty() alt: string;
  @ApiProperty({ enum: ['cover', 'before', 'after', 'gallery'] }) kind: string;
  @ApiProperty({ nullable: true, type: Number }) width: number | null;
  @ApiProperty({ nullable: true, type: Number }) height: number | null;
}

export class ProjectSummaryDto {
  @ApiProperty({ example: 'vrf-vrv-installation' }) slug: string;
  @ApiProperty() title: string;
  @ApiProperty() summary: string;
  @ApiProperty() buildingType: string;
  @ApiProperty() location: string;
  @ApiProperty() system: string;
  @ApiProperty({ nullable: true, type: String }) capacity: string | null;
  @ApiProperty({ type: [String] }) servicesProvided: string[];
  @ApiProperty({ type: [String] }) serviceSlugs: string[];
  @ApiProperty({ type: ProjectImageDto, nullable: true }) coverImage: ProjectImageDto | null;
  @ApiProperty({ type: ProjectImageDto, nullable: true }) beforeImage: ProjectImageDto | null;
  @ApiProperty({ type: ProjectImageDto, nullable: true }) afterImage: ProjectImageDto | null;
  @ApiProperty({ description: 'True only when drafts are exposed for local preview' }) isDraft: boolean;
}

export class ProjectDetailDto extends ProjectSummaryDto {
  @ApiProperty() challenge: string;
  @ApiProperty() solution: string;
  @ApiProperty() execution: string;
  @ApiProperty() outcome: string;
  @ApiProperty({ type: [ProjectImageDto] }) images: ProjectImageDto[];
  @ApiProperty({ nullable: true, type: String }) completedAt: string | null;
  @ApiProperty() updatedAt: string;
}

class CountMeta {
  @ApiProperty() count: number;
}

export class ProjectListResponse {
  @ApiProperty({ type: [ProjectSummaryDto] }) data: ProjectSummaryDto[];
  @ApiProperty({ type: CountMeta }) meta: CountMeta;
}

export class ProjectResponse {
  @ApiProperty({ type: ProjectDetailDto }) data: ProjectDetailDto;
}
