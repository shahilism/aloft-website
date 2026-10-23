import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { getService, servicesByOrder, type Service } from '@aloft/content';
import { ApiErrorResponse } from '../common/api-error';
import { ServiceDto, ServiceListResponse, ServiceResponse } from './service.dto';

/**
 * Serves service content from the shared @aloft/content package, the same
 * source the frontend renders statically, so both always agree.
 */
@ApiTags('Services')
@Controller('services')
export class ServicesController {
  @Get()
  @ApiOkResponse({ type: ServiceListResponse })
  list(): ServiceListResponse {
    const data = servicesByOrder.map(toDto);
    return { data, meta: { count: data.length } };
  }

  @Get(':slug')
  @ApiOkResponse({ type: ServiceResponse })
  @ApiNotFoundResponse({ type: ApiErrorResponse })
  get(@Param('slug') slug: string): ServiceResponse {
    const service = getService(slug);
    if (!service) throw new NotFoundException('Service not found');
    return { data: toDto(service) };
  }
}

function toDto(s: Service): ServiceDto {
  return {
    slug: s.slug,
    name: s.name,
    summary: s.summary,
    headline: s.h1,
    intro: s.intro,
    covers: s.covers,
    cta: s.cta,
    seoTitle: s.seoTitle,
    metaDescription: s.metaDescription,
    path: `/services/${s.slug}`,
    image: s.image,
  };
}
