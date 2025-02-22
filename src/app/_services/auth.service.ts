import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/";

  constructor(private http: HttpClient) {}

  loggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  login(model: any, endpoint: string) {
    return this.http.post(this.baseUrl + endpoint + "/login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
        }
      })
    );
  }

  register(model: any, endpoint: string) {
    return this.http.post(this.baseUrl + endpoint + "/register", model);
  }
}
