import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import IDeletePizzaUseCase from '../interfaces/delete-pizza-use-case';
import Pizza from '../entities/pizza';
import { Repository } from 'typeorm';

export default class DeletePizzaUseCase implements IDeletePizzaUseCase {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,
  ) {}

  async execute(id: string): Promise<void> {
    const pizza = await this.pizzaRepository.findOne({ where: { id } });

    if (!pizza) {
      throw new NotFoundException('Pizza not found');
    }

    await this.pizzaRepository.delete(id);
  }
}
