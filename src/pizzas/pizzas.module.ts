import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PizzasController from './pizzas.controller';
import CreatePizzaUseCase from './use-cases/create-pizza-use-case';
import Pizza from './entities/pizza';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Pizza],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Pizza]),
  ],
  controllers: [PizzasController],
  providers: [
    {
      provide: 'CreatePizzaUseCase',
      useClass: CreatePizzaUseCase,
    },
  ],
})
export class PizzasModule {}
