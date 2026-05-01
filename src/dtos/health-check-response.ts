import { ApiProperty } from '@nestjs/swagger';

export default class HealthCheckResponse {
  @ApiProperty()
  status: string;

  constructor() {
    this.status = 'OK';
  }
}
