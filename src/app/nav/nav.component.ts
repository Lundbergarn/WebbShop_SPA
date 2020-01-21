import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { OrderService } from "../order.service";
import { CustomerService } from "../customer.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  model: any = {};
  id: any;
  user: string = "";
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.subscription = this.orderService
        .getCustomer()
        .subscribe(customer => {
          this.user = customer.userName || null;
          this.customerService.setUserName(customer.userName);
        });
    }
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.model, "customer/auth").subscribe(
      () => {
        this.alertify.success("logged in successfully");
        this.orderService.loggedIn();
        this.customerService.setUserName(this.model.username);
        this.user = this.model.username;
        this.isLoading = false;
      },
      error => {
        this.alertify.error(error);
        this.isLoading = false;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
