import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

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
  @Column()
  smallPrice!: number;

  @ApiProperty()
  @Column()
  mediumPrice!: number;

  @ApiProperty()
  @Column()
  largePrice!: number;

  @ApiProperty({ enum: ['Tradicional', 'Especial', 'Doce'] })
  @Column()
  category!: 'Tradicional' | 'Especial' | 'Doce';
}
