import { InjectRepository } from '@nestjs/typeorm';
import Pizza from '../entities/pizza';
import ICreatePizzaUseCase from '../interfaces/create-pizza-use-case';
import { Repository } from 'typeorm';

export default class CreatePizzaUseCase implements ICreatePizzaUseCase {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,
  ) {}

  execute(pizza: Omit<Pizza, 'id'>): Promise<Pizza> {
    return this.pizzaRepository.save(pizza);
  }
}
