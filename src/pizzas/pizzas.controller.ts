import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import Pizza from './entities/pizza';
import type ICreatePizzaUseCase from './interfaces/create-pizza-use-case';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import CreatePizzaRequest from './dtos/create-pizza-request';
import type IReadPizzaUseCase from './interfaces/read-pizza-use-case';
import type IUpdatePizzaUseCase from './interfaces/update-pizza-use-case';

@ApiTags('Pizzas')
@Controller()
export default class PizzasController {
  constructor(
    @Inject('CreatePizzaUseCase')
    private createPizzaUseCase: ICreatePizzaUseCase,
    @Inject('ReadPizzaUseCase')
    private readPizzaUseCase: IReadPizzaUseCase,
    @Inject('UpdatePizzaUseCase')
    private updatePizzaUseCase: IUpdatePizzaUseCase,
  ) {}

  @ApiCreatedResponse({ type: Pizza })
  @Post()
  create(@Body() pizza: CreatePizzaRequest): Promise<Pizza> {
    return this.createPizzaUseCase.execute(pizza);
  }

  @ApiOkResponse({ type: Pizza })
  @Get(':id')
  read(@Param('id') id: string): Promise<Pizza> {
    return this.readPizzaUseCase.execute(id);
  }

  @ApiOkResponse({ type: Pizza })
  @Put(':id')
  update(@Param('id') id: string, @Body() pizza: Pizza): Promise<Pizza> {
    return this.updatePizzaUseCase.execute(id, pizza);
  }
}
