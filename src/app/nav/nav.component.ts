import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { OrderService } from "../order.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  id: any;
  user: string;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private orderService: OrderService
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model, "customer/auth").subscribe(
      next => {
        this.alertify.success("logged in successfully");
        this.orderService.loggedIn();
        this.user = this.model.username;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    // return true or false
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("logged out");
    this.user = "";
  }
}
