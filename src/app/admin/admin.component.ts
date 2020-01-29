import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { AlertifyService } from "../_services/alertify.service";
import { OrderService } from "../_services/order.service";
import { Order } from "../_models/order";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  orders: Order[];

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.orderService.getOrders().subscribe(
        (orders: Order[]) => {
          this.orders = orders;
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
