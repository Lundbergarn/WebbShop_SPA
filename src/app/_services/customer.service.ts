import { Injectable } from "@angular/core";
import { Subject, Observable, of, throwError, Subscription } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { OrderService } from "./order.service";
import { environment } from "src/environments/environment";
import { Customer } from "../_models/customer";

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token")
  })
};

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  baseUrl = environment.apiUrl;
  userName = new Subject<string>();

  constructor(private http: HttpClient, private orderService: OrderService) {}

  setUserName(name: string) {
    this.userName.next(name);
  }

  getUserName() {
    return this.userName;
  }

  getCustomer(): Observable<Customer> {
    return this.http
      .get<Customer>(this.baseUrl + "customer", httpOptions)
      .pipe(catchError(this.handleError<Customer>("getCustomer")));
  }

  removeCustomer(): Observable<Object> {
    return this.http
      .delete(this.baseUrl + "customer", httpOptions)
      .pipe(catchError(this.handleError("sendRemoveCustomer")));
  }

  sendCustomerData(customerData: Customer): Observable<Object> {
    return this.http
      .put(this.baseUrl + "customer", customerData, {
        headers: new HttpHeaders()
          .set("Authorization", "Bearer " + localStorage.getItem("token"))
          .set("Content-Type", "application/json")
      })
      .pipe(catchError(this.handleError("sendCustomerOrder")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
