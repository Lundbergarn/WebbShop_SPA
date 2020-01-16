import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  userName: string = "";

  constructor() {}

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }
}
