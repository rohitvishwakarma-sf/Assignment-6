export enum ClassConstants {
  editbutton = "editbutton",
  deletebutton = "deletebutton",
  cancelbutton = "cancelbutton",
  savebutton = "savebutton",
}
export function fulldate(date: string): string {
  const dateObj = new Date(date);
  const fdate =
    dateObj.getDay() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear();
  return fdate;
}
