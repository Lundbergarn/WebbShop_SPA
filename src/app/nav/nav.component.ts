import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { OrderService } from "../order.service";
import { CustomerService } from "../customer.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

import { orderRows } from "../_models/orderRows";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscriptionBasket: Subscription;
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
    private router: Router,
    private route: ActivatedRoute
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

    // Get basket count
    this.basketCount = this.orderService.getBasketOrders().length || 0;
    this.subscriptionBasket = this.orderService.basketChanged.subscribe(
      (orderRows: orderRows[]) => {
        console.log(orderRows);
        this.basketCount = orderRows.length;
      }
    );
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

        this.router.navigate(["products"]);
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
    this.subscriptionBasket.unsubscribe();
  }
}
