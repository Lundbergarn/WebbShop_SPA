import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../order.service";
import { Order } from "../_models/order";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[];

  subscription: Subscription;
  customer: boolean = false;
  customerId: number;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.orderService.verifiedCustomer.subscribe(el => {
      this.getCustomerOrders();
    });

    if (localStorage.getItem("token")) {
      this.getCustomerOrders();
      this.customer = true;
    }
  }

  getCustomerOrders(): void {
    this.orderService
      .getCustomer()
      .subscribe(customer => (this.orders = customer.order));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
