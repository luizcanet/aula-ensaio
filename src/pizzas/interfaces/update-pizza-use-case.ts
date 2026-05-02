import Pizza from '../entities/pizza';

export default interface IUpdatePizzaUseCase {
  execute(id: string, pizza: Pizza): Promise<Pizza>;
}
