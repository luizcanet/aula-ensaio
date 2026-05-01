import { Controller, Get } from '@nestjs/common';
import HealthCheckResponse from './dtos/health-check-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  @ApiOkResponse({ type: HealthCheckResponse })
  healthCheck(): HealthCheckResponse {
    return new HealthCheckResponse();
  }
}
