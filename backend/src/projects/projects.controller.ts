import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../common/api-error';
import { ListProjectsQuery, ProjectListResponse, ProjectResponse } from './project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  @ApiOkResponse({ type: ProjectListResponse, description: 'Published project case studies.' })
  async list(@Query() query: ListProjectsQuery): Promise<ProjectListResponse> {
    const data = await this.projects.list({ service: query.service });
    return { data, meta: { count: data.length } } as ProjectListResponse;
  }

  @Get(':slug')
  @ApiOkResponse({ type: ProjectResponse })
  @ApiNotFoundResponse({ type: ApiErrorResponse })
  async get(@Param('slug') slug: string): Promise<ProjectResponse> {
    return { data: await this.projects.getBySlug(slug) } as ProjectResponse;
  }
}
