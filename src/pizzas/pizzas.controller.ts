import { Body, Controller, Inject, Post } from '@nestjs/common';
import Pizza from './entities/pizza';
import type ICreatePizzaUseCase from './interfaces/create-pizza-use-case';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import CreatePizzaRequest from './dtos/create-pizza-request';

@ApiTags('Pizzas')
@Controller()
export default class PizzasController {
  constructor(
    @Inject('CreatePizzaUseCase')
    private createPizzaUseCase: ICreatePizzaUseCase,
  ) {}

  @ApiCreatedResponse({ type: Pizza })
  @Post()
  create(@Body() pizza: CreatePizzaRequest): Promise<Pizza> {
    return this.createPizzaUseCase.execute(pizza);
  }
}
