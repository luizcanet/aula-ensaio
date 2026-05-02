import { DataSource, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import UpdatePizzaUseCase from './update-pizza-use-case';
import Pizza from '../entities/pizza';

describe('UpdatePizzaUseCase', () => {
  let dataSource: DataSource;
  let pizzaRepository: Repository<Pizza>;
  let updatePizzaUseCase: UpdatePizzaUseCase;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      entities: [Pizza],
      synchronize: true,
      logging: false,
    });

    await dataSource.initialize();
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
  });

  beforeEach(async () => {
    pizzaRepository = dataSource.getRepository(Pizza);
    updatePizzaUseCase = new UpdatePizzaUseCase(pizzaRepository);
    await pizzaRepository.clear();
  });

  it('should throw BadRequestException when id does not match pizza.id', async () => {
    const pizzaData: Pizza = {
      id: 'some-id',
      name: 'Margherita',
      ingredients: ['tomato', 'mozzarella'],
      smallPrice: 10,
      mediumPrice: 15,
      largePrice: 20,
      category: 'Tradicional',
    };

    const differentId = 'different-id';

    await expect(
      updatePizzaUseCase.execute(differentId, pizzaData),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException when pizza not found', async () => {
    const pizzaData: Pizza = {
      id: 'non-existent-id',
      name: 'Margherita',
      ingredients: ['tomato', 'mozzarella'],
      smallPrice: 10,
      mediumPrice: 15,
      largePrice: 20,
      category: 'Tradicional',
    };

    await expect(
      updatePizzaUseCase.execute(pizzaData.id!, pizzaData),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update the pizza and return the updated entity', async () => {
    const initialPizzaData: Omit<Pizza, 'id'> = {
      name: 'Margherita',
      ingredients: ['tomato', 'mozzarella'],
      smallPrice: 10,
      mediumPrice: 15,
      largePrice: 20,
      category: 'Tradicional',
    };

    const createdPizza = await pizzaRepository.save(initialPizzaData);

    const updatedPizzaData: Pizza = {
      ...createdPizza,
      name: 'Updated Margherita',
      smallPrice: 12,
    };

    const result = await updatePizzaUseCase.execute(
      createdPizza.id!,
      updatedPizzaData,
    );

    expect(result.id).toBe(createdPizza.id);
    expect(result.name).toBe('Updated Margherita');
    expect(result.smallPrice).toBe(12);
    expect(result.ingredients).toEqual(['tomato', 'mozzarella']);
  });
});
