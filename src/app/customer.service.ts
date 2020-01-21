import { Injectable } from "@angular/core";
import { Subject, Observable, of, throwError, Subscription } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { Customer } from "./_models/customer";
import { OrderService } from "./order.service";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  Url: string = "http://localhost:5000/api/";
  userName: string = "Unknown";

  constructor(private http: HttpClient, private orderService: OrderService) {}

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }

  sendCustomerData(customerData) {
    return this.http
      .put(this.Url + "customer", customerData, {
        headers: new HttpHeaders()
          .set("Authorization", "Bearer " + localStorage.getItem("token"))
          .set("Content-Type", "application/json")
      })
      .pipe(
        tap(customerData => console.log(`Sent order `, customerData)),
        catchError(this.handleError("sendCustomerOrder"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
