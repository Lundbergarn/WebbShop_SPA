import { Injectable } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError, map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { orderRows } from "../_models/orderRows";
import { Order } from "../_models/order";

@Injectable()
export class OrderService {
  baseUrl = environment.apiUrl;
  private basketProducts: orderRows[] = [];
  basketChanged = new Subject<orderRows[]>();
  verifiedCustomer = new Subject<boolean>();
  isCustomerLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  getCustomerLoggedIn() {
    return this.isCustomerLoggedIn;
  }

  loggedIn() {
    this.isCustomerLoggedIn = true;
    this.verifiedCustomer.next(this.isCustomerLoggedIn);
  }

  getBasketOrders() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket === null) {
      this.basketProducts = [];
      return this.basketProducts.slice();
    }

    this.basketProducts = basket;
    return this.basketProducts.slice();
  }

  emptyBasketOrders() {
    this.basketProducts = [];
    localStorage.removeItem("basket");
    this.basketChanged.next([]);
  }

  // Add to local basket
  addProduct(orderRow: orderRows) {
    this.basketProducts.push(orderRow);
    this.basketChanged.next(this.basketProducts.slice());
    localStorage.setItem("basket", JSON.stringify(this.basketProducts));
  }

  // Remove product from basket
  removeProduct(index: number) {
    this.basketProducts.splice(index, 1);
    this.basketChanged.next(this.basketProducts);
    localStorage.setItem("basket", JSON.stringify(this.basketProducts));
  }

  // Get all orders to customer
  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.baseUrl + "admin")
      .pipe(catchError(this.handleError<Order[]>("getOrders", [])));
  }

  // Update quantity
  updateQuantity(id: number, value: number) {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket[id].qty = value;
    localStorage.setItem("basket", JSON.stringify(basket));
    this.basketChanged.next(this.basketProducts.slice());
  }

  // Send one row at a time
  sendCustomerOrder(order) {
    return this.http
      .post(this.baseUrl + "customer", order, {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      })
      .pipe(
        tap((order: Order) => console.log("Sent order ", order)),
        catchError(this.handleError<orderRows>("sendCustomerOrder"))
      );
  }

  /**
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
