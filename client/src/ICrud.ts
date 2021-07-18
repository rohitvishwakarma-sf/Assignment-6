export interface ICrud {
  create(
    hostEle: HTMLElement,
    editHandler: EventListenerOrEventListenerObject,
    deleteHandler: EventListenerOrEventListenerObject,
    saveHandler: EventListenerOrEventListenerObject,
    cancelHandler: EventListenerOrEventListenerObject
  ): void;
  delete(): void;
  edit(): void;
  save(): void;
  cancel(): void;
}
