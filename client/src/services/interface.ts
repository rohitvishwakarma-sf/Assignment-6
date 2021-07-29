export interface ICrud<T> {
  create(obj: T): void;
  read(): any;
  delete(obj: T): void;
  save(obj: T): void;
}
