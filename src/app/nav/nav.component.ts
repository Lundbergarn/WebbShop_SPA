import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SubSink } from "subsink";

import { CustomerService } from "../_services/customer.service";
import { AlertifyService } from "../_services/alertify.service";
import { OrderService } from "../_services/order.service";
import { AuthService } from "../_services/auth.service";
import { orderRows } from "../_models/orderRows";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  model: any = {};
  id: any;
  user: string = "";
  isLoading: boolean = false;
  basketCount: number = 0;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.subs.add(
        this.customerService.getCustomer().subscribe(customer => {
          this.user = customer.userName || null;
          this.customerService.setUserName(customer.userName);
        })
      );
    }

    this.subs.add(
      this.customerService.getUserName().subscribe(name => {
        this.user = name;
      })
    );

    // Get basket count
    this.basketCount = this.orderService.getBasketOrders().length || 0;
    this.subs.add(
      this.orderService.basketChanged.subscribe((orderRows: orderRows[]) => {
        this.basketCount = orderRows.length;
      })
    );
  }

  login() {
    this.isLoading = true;
    this.subs.add(
      this.authService.login(this.model, "customer/auth").subscribe(
        () => {
          this.orderService.loggedIn();
          this.customerService.setUserName(this.model.username);
          this.user = this.model.username;
          this.isLoading = false;

          this.alertify.success("Logged in successfully");
          this.router.navigate(["products"]);
        },
        error => {
          this.alertify.error(error);
          this.isLoading = false;
        }
      )
    );
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    // return true or false
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("Logged out");
    this.router.navigate(["home"]);
    this.user = "";
    this.orderService.emptyBasketOrders();
  }

  removeCustomer() {
    this.subs.add(
      this.customerService.removeCustomer().subscribe(
        () => {
          this.alertify.message("Account removed");
          this.logout();
          this.router.navigate(["/"]);
          localStorage.removeItem("basket");
          this.orderService.emptyBasketOrders();
        },
        error => {
          this.alertify.error(error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
