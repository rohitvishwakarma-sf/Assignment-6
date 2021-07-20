// import { TableView } from "./UserCrud";
// import { autoBind } from "./decorators/autobind";
// import { plainToClass } from "class-transformer";
// import { User } from "./User";
// import { ICrud } from "./interface";

// // export const myURL: string = "http://192.168.29.216:5000";
// export const myURL: string = "http://localhost:5000";

// function dateTimeDC(target: any, propertyKey: string) {
//   const update = Reflect.defineProperty(target, propertyKey, {
//     get: () => {
//       return new Date().toLocaleString();
//     },
//     set: (value: string) => {},
//   });
// }
// class HomePage {
//   loadButton: HTMLButtonElement;
//   refreshButton: HTMLButtonElement;
//   tableView: TableView;
//   @dateTimeDC
//   date: string = "";

//   constructor() {
//     this.loadButton = document.getElementById(
//       "loadbutton"
//     )! as HTMLButtonElement;
//     this.refreshButton = document.getElementById(
//       "refreshbutton"
//     )! as HTMLButtonElement;
//     this.tableView = new TableView("tablecontainer");

//     this.loadButton.addEventListener("click", this.loadData);
//     this.refreshButton.addEventListener("click", this.refreshData);
//     this.refreshButton.style.display = "none";
//     // this.loadData();
//   }

//   updateDate() {
//     const datetime = document.getElementById("datetime");
//     datetime!.innerHTML = `Updated on - ${this.date.replace(",", " at ")}`;
//   }

//   @autoBind
//   async loadData() {
//     // const url = 'http://localhost:5000';
//     await fetch(myURL, {})
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         let userarr: ICrud[] = [];
//         for (const user of data) {
//           const newUser = plainToClass(User, user as Object)!;
//           userarr.push(newUser);
//         }
//         this.tableView.load(userarr);
//       })
//       .catch((err) => console.log(err));

//     this.refreshButton.style.display = "";
//     this.loadButton.style.display = "none";
//     this.updateDate();
//   }
//   @autoBind
//   refreshData(): void {
//     this.tableView!.refresh();
//     this.updateDate();
//   }
// }
// new HomePage();
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
