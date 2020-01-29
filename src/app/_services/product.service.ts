import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { AlertifyService } from "./alertify.service";
import { environment } from "src/environments/environment";
import { Color } from "../_models/color";
import { Shoe } from "../_models/shoe";
import { Size } from "../_models/size";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, private alertify: AlertifyService) {}
  baseUrl = environment.apiUrl;

  getShoes(): Observable<Shoe[]> {
    return this.http
      .get<Shoe[]>(this.baseUrl + "shoe")
      .pipe(catchError(this.handleError<Shoe[]>("getShoes", [])));
  }

  getShoe(id): Observable<Shoe> {
    return this.http
      .get<Shoe>(this.baseUrl + "shoe/" + id)
      .pipe(catchError(this.handleError<Shoe>("getShoe")));
  }

  getSizes(): Observable<Size[]> {
    return this.http
      .get<Size[]>(this.baseUrl + "size")
      .pipe(catchError(this.handleError<Size[]>("getSizes", [])));
  }

  getSize(id): Observable<Size> {
    return this.http
      .get<Size>(this.baseUrl + "size/" + id)
      .pipe(catchError(this.handleError<Size>("getSize")));
  }

  getColors(): Observable<Color[]> {
    return this.http
      .get<Color[]>(this.baseUrl + "color")
      .pipe(catchError(this.handleError<Color[]>("getColors", [])));
  }

  getColor(id): Observable<Color> {
    return this.http
      .get<Color>(this.baseUrl + "color/" + id)
      .pipe(catchError(this.handleError<Color>("getColors")));
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
