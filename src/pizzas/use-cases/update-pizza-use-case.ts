import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import IUpdatePizzaUseCase from '../interfaces/update-pizza-use-case';
import Pizza from '../entities/pizza';
import { Repository } from 'typeorm';

export default class UpdatePizzaUseCase implements IUpdatePizzaUseCase {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,
  ) {}

  async execute(id: string, pizza: Pizza): Promise<Pizza> {
    if (id !== pizza.id) {
      throw new BadRequestException('Pizza id does not match the provided id');
    }

    const existingPizza = await this.pizzaRepository.findOneBy({ id });

    if (!existingPizza) {
      throw new NotFoundException(`Pizza with id ${id} not found`);
    }

    return this.pizzaRepository.save(pizza);
  }
}
