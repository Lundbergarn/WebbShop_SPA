import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { OrderService } from "../_services/order.service";
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

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.subs.add(
      this.orderService.verifiedCustomer.subscribe(el => {
        this.getCustomerOrders();
      })
    );

    if (localStorage.getItem("token")) {
      this.getCustomerOrders();
      this.customer = true;
    }
  }

  getCustomerOrders(): void {
    this.isLoading = true;
    this.subs.add(
      this.orderService.getCustomer().subscribe(customer => {
        this.orders = customer.order;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
