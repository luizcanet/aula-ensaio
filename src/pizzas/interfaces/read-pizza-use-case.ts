import Pizza from '../entities/pizza';

export default interface IReadPizzaUseCase {
  execute(id: string): Promise<Pizza>;
}
