import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../order.service";
import { Order } from "../order.model";
import { Subscription } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy {
  orders: Order[];
  subscription: Subscription;
  admin: boolean = false;
  model: any = {};
  id: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    // this.subscription = this.orderService.verifiedAdmin.subscribe(el => {
    //   this.getOrders();
    //   this.admin = true;
    // });

    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
