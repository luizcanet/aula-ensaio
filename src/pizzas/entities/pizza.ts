import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

export enum Category {
  Tradicional = 'Tradicional',
  Especial = 'Especial',
  Doce = 'Doce',
}

@Entity()
export default class Pizza {
  @ApiProperty()
  @PrimaryColumn()
  @Generated('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty()
  @Column('simple-array')
  ingredients!: string[];

  @ApiProperty()
  @Column('decimal')
  smallPrice!: number;

  @ApiProperty()
  @Column('decimal')
  mediumPrice!: number;

  @ApiProperty()
  @Column('decimal')
  largePrice!: number;

  @ApiProperty({ enum: ['Tradicional', 'Especial', 'Doce'] })
  @Column()
  category!: Category;
}
