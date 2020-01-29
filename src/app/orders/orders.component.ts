import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { CustomerService } from "../_services/customer.service";
import { AlertifyService } from "../_services/alertify.service";
import { OrderService } from "../_services/order.service";
import { Customer } from "../_models/customer";
import { Order } from "../_models/order";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  orders: Order[];
  isLoading: boolean = false;
  customer: boolean = false;
  customerId: number;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.orderService.verifiedCustomer.subscribe(
        (loggedIn: boolean) => {
          this.loadCustomerOrders();
          this.customer = true;
        },
        error => {
          this.alertify.error(error);
        }
      )
    );

    if (localStorage.getItem("token")) {
      this.loadCustomerOrders();
      this.customer = true;
    }
  }

  loadCustomerOrders(): void {
    this.isLoading = true;
    this.subs.add(
      this.customerService.getCustomer().subscribe(
        (customer: Customer) => {
          this.orders = customer.order;
          this.isLoading = false;
        },
        error => {
          this.alertify.error(error);
          this.isLoading = false;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
