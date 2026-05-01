import Pizza from '../entities/pizza';

export default interface ICreatePizzaUseCase {
  execute(pizza: Omit<Pizza, 'id'>): Promise<Pizza>;
}
