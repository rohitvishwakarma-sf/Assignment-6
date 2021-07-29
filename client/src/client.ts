import { autoBind } from "./decorators/decorator";
import { UserController } from "./controller/UserController";

// // export const myURL: string = "http://192.168.29.216:5000";
export const myURL: string = "http://localhost:5000";

function dateTimeDC(target: any, propertyKey: string) {
  const update = Reflect.defineProperty(target, propertyKey, {
    get: () => {
      return new Date().toLocaleString();
    },
    set: (value: string) => {},
  });
}
class HomePage {
  loadButton: HTMLButtonElement;
  refreshButton: HTMLButtonElement;
  userController: UserController;
  @dateTimeDC
  date: string = "";

  constructor() {
    this.loadButton = document.getElementById(
      "loadbutton"
    )! as HTMLButtonElement;
    this.refreshButton = document.getElementById(
      "refreshbutton"
    )! as HTMLButtonElement;
    this.userController = new UserController("tablecontainer");

    this.loadButton.addEventListener("click", this.loadData);
    this.refreshButton.addEventListener("click", this.refreshData);
    this.refreshButton.style.display = "none";
  }

  updateDate() {
    const datetime = document.getElementById("datetime");
    datetime!.innerHTML = `Updated on - ${this.date.replace(",", " at ")}`;
  }

  @autoBind
  loadData(): void {
    this.userController.load();
    this.refreshButton.style.display = "";
    this.loadButton.style.display = "none";
    this.updateDate();
  }
  @autoBind
  refreshData(): void {
    this.userController!.refresh();
    this.updateDate();
  }
}
new HomePage();
