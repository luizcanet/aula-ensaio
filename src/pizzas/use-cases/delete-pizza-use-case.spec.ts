import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import DeletePizzaUseCase from './delete-pizza-use-case';
import Pizza from '../entities/pizza';

describe('DeletePizzaUseCase', () => {
  let dataSource: DataSource;
  let pizzaRepository: Repository<Pizza>;
  let deletePizzaUseCase: DeletePizzaUseCase;

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
    deletePizzaUseCase = new DeletePizzaUseCase(pizzaRepository);
    await pizzaRepository.clear();
  });

  it('should delete the pizza if it exists', async () => {
    const pizza = await pizzaRepository.save({
      name: 'Margherita',
      ingredients: ['tomato', 'mozzarella'],
      smallPrice: 10,
      mediumPrice: 15,
      largePrice: 20,
      category: 'Tradicional',
    });

    await expect(
      deletePizzaUseCase.execute(pizza.id!),
    ).resolves.toBeUndefined();

    const deleted = await pizzaRepository.findOne({ where: { id: pizza.id } });
    expect(deleted).toBeNull();
  });

  it('should throw NotFoundException if pizza not found', async () => {
    await expect(deletePizzaUseCase.execute('non-existing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
