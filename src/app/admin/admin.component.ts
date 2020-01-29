import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { OrderService } from "../_services/order.service";
import { Order } from "../_models/order";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  orders: Order[];
  admin: boolean = false;
  model: any = {};
  id: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.orderService.getOrders().subscribe(orders => (this.orders = orders))
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
