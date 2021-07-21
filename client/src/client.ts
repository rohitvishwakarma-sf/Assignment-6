import { UserCrud } from "./UserCrud";
import { autoBind } from "./decorators/decorator";

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
  userCrud: UserCrud;
  @dateTimeDC
  date: string = "";

  constructor() {
    this.loadButton = document.getElementById(
      "loadbutton"
    )! as HTMLButtonElement;
    this.refreshButton = document.getElementById(
      "refreshbutton"
    )! as HTMLButtonElement;
    this.userCrud = new UserCrud("tablecontainer");
    this.loadButton.addEventListener("click", this.loadData);
    this.refreshButton.addEventListener("click", this.refreshData);
    this.refreshButton.style.display = "none";
    // this.loadData();
  }

  updateDate() {
    const datetime = document.getElementById("datetime");
    datetime!.innerHTML = `Updated on - ${this.date.replace(",", " at ")}`;
  }

  @autoBind
  loadData(): void {
    this.userCrud.load();
    this.refreshButton.style.display = "";
    this.loadButton.style.display = "none";
    this.updateDate();
  }
  @autoBind
  refreshData(): void {
    this.userCrud!.refresh();
    this.updateDate();
  }
}
new HomePage();
