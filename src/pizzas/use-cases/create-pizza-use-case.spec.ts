import { DataSource, Repository } from 'typeorm';
import CreatePizzaUseCase from './create-pizza-use-case';
import Pizza from '../entities/pizza';

describe('CreatePizzaUseCase', () => {
  let dataSource: DataSource;
  let pizzaRepository: Repository<Pizza>;
  let createPizzaUseCase: CreatePizzaUseCase;

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
    createPizzaUseCase = new CreatePizzaUseCase(pizzaRepository);
    await pizzaRepository.clear();
  });

  it('should save the pizza and return the created entity', async () => {
    const pizzaData: Omit<Pizza, 'id'> = {
      name: 'Margherita',
      ingredients: ['tomato', 'mozzarella'],
      smallPrice: 10,
      mediumPrice: 15,
      largePrice: 20,
    };

    const result = await createPizzaUseCase.execute(pizzaData);

    expect(result).toMatchObject(pizzaData);
    expect(result.id).toBeDefined();
  });
});
