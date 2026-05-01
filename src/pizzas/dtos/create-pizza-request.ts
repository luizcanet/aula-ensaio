import { ApiProperty } from '@nestjs/swagger';

export default class CreatePizzaRequest {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  ingredients!: string[];

  @ApiProperty()
  smallPrice!: number;

  @ApiProperty()
  mediumPrice!: number;

  @ApiProperty()
  largePrice!: number;
}
