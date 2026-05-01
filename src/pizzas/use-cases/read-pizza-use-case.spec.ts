import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import ReadPizzaUseCase from './read-pizza-use-case';
import Pizza from '../entities/pizza';

describe('ReadPizzaUseCase', () => {
  let dataSource: DataSource;
  let pizzaRepository: Repository<Pizza>;
  let readPizzaUseCase: ReadPizzaUseCase;

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
    readPizzaUseCase = new ReadPizzaUseCase(pizzaRepository);
    await pizzaRepository.clear();
  });

  it('should return pizza when found', async () => {
    const pizzaData: Omit<Pizza, 'id'> = {
      name: 'Margherita',
      ingredients: ['tomato', 'mozzarella'],
      smallPrice: 10,
      mediumPrice: 15,
      largePrice: 20,
      category: 'Tradicional',
    };

    const createdPizza = await pizzaRepository.save(pizzaData);

    const result = await readPizzaUseCase.execute(createdPizza.id!);

    expect(result).toMatchObject(pizzaData);
    expect(result.id).toBe(createdPizza.id);
  });

  it('should throw NotFoundException when pizza not found', async () => {
    const nonExistentId = 'non-existent-id';

    await expect(readPizzaUseCase.execute(nonExistentId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
