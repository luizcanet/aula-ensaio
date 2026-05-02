import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/pizza';

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

  @ApiProperty({ enum: ['Tradicional', 'Especial', 'Doce'] })
  category!: Category;
}
