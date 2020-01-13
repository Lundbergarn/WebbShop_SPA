import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { Order } from "../order.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  orders: Order[];
  subscription: Subscription;
  admin: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.subscription = this.orderService.verifiedAdmin.subscribe(el => {
      this.getOrders();
      this.admin = true;
    });

    if (localStorage.getItem("token")) {
      this.getOrders();
    }
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }
}
