import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PizzasController from './pizzas.controller';
import CreatePizzaUseCase from './use-cases/create-pizza-use-case';
import ReadPizzaUseCase from './use-cases/read-pizza-use-case';
import Pizza from './entities/pizza';
import UpdatePizzaUseCase from './use-cases/update-pizza-use-case';
import DeletePizzaUseCase from './use-cases/delete-pizza-use-case';

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
    {
      provide: 'ReadPizzaUseCase',
      useClass: ReadPizzaUseCase,
    },
    {
      provide: 'UpdatePizzaUseCase',
      useClass: UpdatePizzaUseCase,
    },
    {
      provide: 'DeletePizzaUseCase',
      useClass: DeletePizzaUseCase,
    },
  ],
})
export class PizzasModule {}
