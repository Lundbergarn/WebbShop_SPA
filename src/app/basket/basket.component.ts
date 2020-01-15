import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../order.service";
import { Subscription } from "rxjs";
import { order_Rows } from "../order_rows.model";
import { ProductService } from "../product.service";
import { Shoe } from "../shoe.model";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"]
})
export class BasketComponent implements OnInit, OnDestroy {
  orders: order_Rows[];
  subscription: Subscription;
  checkout: boolean = false;

  shoes: Shoe[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  // To not get undefined from shoe URL in HTML loop
  shoeUrl(i) {
    if (this.shoes[i] == undefined) {
      return null;
    }
    return this.shoes[i].image_Url;
  }

  ngOnInit() {
    this.subscription = this.orderService.basketChanged.subscribe(
      (orderRows: order_Rows[]) => {
        this.orders = orderRows;
      }
    );
    this.getBasketOrders();
    this.subscription = this.orderService.verifiedCustomer.subscribe(el => {
      this.checkout = true;
    });

    this.orders.forEach(el => {
      this.productService
        .getShoe(el.shoeId)
        .subscribe(shoes => this.shoes.push(shoes));
    });
  }

  getBasketOrders(): void {
    this.orders = this.orderService.getBasketOrders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
