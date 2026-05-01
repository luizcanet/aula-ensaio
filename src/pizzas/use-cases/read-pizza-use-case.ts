import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import IReadPizzaUseCase from '../interfaces/read-pizza-use-case';
import Pizza from '../entities/pizza';
import { Repository } from 'typeorm';

export default class ReadPizzaUseCase implements IReadPizzaUseCase {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,
  ) {}

  async execute(id: string): Promise<Pizza> {
    const pizza = await this.pizzaRepository.findOneBy({ id });

    if (!pizza) {
      throw new NotFoundException(`Pizza with id ${id} not found`);
    }

    return pizza;
  }
}
