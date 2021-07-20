export interface ICrud<T> {
  create(obj: T): void;
  edit(obj: T): void;
  delete(obj: T): void;
  save(obj: T): void;
  cancel(obj: T): void;
}
