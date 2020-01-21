import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Shoe } from "./_models/shoe";
import { Size } from "./_models/size";
import { tap, catchError } from "rxjs/operators";
import { AlertifyService } from "./_services/alertify.service";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, private alertify: AlertifyService) {}
  Url: string = "http://localhost:5000/api/";

  getShoes(): Observable<Shoe[]> {
    return this.http
      .get<Shoe[]>(this.Url + "shoe")
      .pipe(catchError(this.handleError<Shoe[]>("getShoes", [])));
  }

  getShoe(id): Observable<Shoe> {
    return this.http
      .get<Shoe>(this.Url + "shoe/" + id)
      .pipe(catchError(this.handleError<Shoe>("getShoe")));
  }

  getSizes(): Observable<Size[]> {
    return this.http
      .get<Size[]>(this.Url + "size")
      .pipe(catchError(this.handleError<Size[]>("getSizes", [])));
  }

  getSize(id): Observable<Size> {
    return this.http
      .get<Size>(this.Url + "size/" + id)
      .pipe(catchError(this.handleError<Size>("getSize")));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.alertify.error("Could not receive data.");
      return of(result as T);
    };
  }
}
