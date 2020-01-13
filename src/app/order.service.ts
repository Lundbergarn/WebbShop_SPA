import { Injectable } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Shoe } from "./shoe.model";
import { tap, catchError } from "rxjs/operators";
import { Order } from "./order.model";

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}
  Url: string = "http://localhost:5000/api/";

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.Url + "admin")
      .pipe(catchError(this.handleError<Order[]>("getOrders", [])));
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
