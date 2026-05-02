export default interface IDeletePizzaUseCase {
  execute(id: string): Promise<void>;
}
