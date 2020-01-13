import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { Order } from "../order.model";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }

  displayOrders() {
    console.log(this.orders);
  }
}
