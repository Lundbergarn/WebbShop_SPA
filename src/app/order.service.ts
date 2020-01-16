import { Injectable } from "@angular/core";
import { Subject, Observable, of, throwError, Subscription } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { tap, catchError, map } from "rxjs/operators";
import { Order } from "./order.model";
import { Customer } from "./customer.model";
import { order_Rows } from "./order_rows.model";

@Injectable()
export class OrderService {
  Url: string = "http://localhost:5000/api/";
  verifiedCustomer = new Subject<boolean>();
  isCustomerLoggedIn: boolean = false;

  basketChanged = new Subject<order_Rows[]>();
  private basketProducts: order_Rows[] = [];

  constructor(private http: HttpClient) {}

  loggedIn() {
    this.isCustomerLoggedIn = true;
    this.verifiedCustomer.next(this.isCustomerLoggedIn);
  }

  getBasketOrders() {
    return this.basketProducts.slice();
  }

  emptyBasketOrders() {
    this.basketProducts = [];
  }

  // Add to local basket
  addProduct(orderRow: order_Rows) {
    this.basketProducts.push(orderRow);
    this.basketChanged.next(this.basketProducts.slice());
  }

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.Url + "admin", {
        headers: new HttpHeaders().set(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        )
      })
      .pipe(catchError(this.handleError<Order[]>("getOrders", [])));
  }

  getCustomer(): Observable<Customer> {
    return this.http
      .get<Customer>(this.Url + "customer", {
        headers: new HttpHeaders().set(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        )
      })
      .pipe(catchError(this.handleError<Customer>("getCustomer")));
  }

  // Skicka hela ordern samtidigt
  // Spara Order i backend och vänta på det nya OrderID
  // Sätt OrderID i varje Order_Row och spara dessa separat
  // Radera localhost basket

  // Skicka en row i taget
  sendCustomerOrder(order) {
    return this.http
      .post(this.Url + "customer", order, {
        headers: new HttpHeaders()
          .set("Authorization", "Bearer " + localStorage.getItem("token"))
          .set("Content-Type", "application/json")
      })
      .pipe(
        tap((order: Order) => console.log(`Sent order `, order)),
        catchError(this.handleError<order_Rows>("sendCustomerOrder"))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
