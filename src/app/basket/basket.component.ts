import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../order.service";
import { Subscription } from "rxjs";
import { order_Rows } from "../_models/order_rows";
import { ProductService } from "../product.service";
import { Shoe } from "../_models/shoe";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"]
})
export class BasketComponent implements OnInit, OnDestroy {
  order_rows: order_Rows[];
  subscription: Subscription;
  checkout: boolean = false;

  shoes: Shoe[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {}

  // To not get undefined from shoe URL in HTML loop
  shoeData(i: number, type: string) {
    if (this.shoes[i] == undefined) {
      return null;
    }
    if (type == "shoe") {
      return this.shoes[i].image_Url;
    } else if (type == "price") {
      return this.shoes[i].price;
    } else {
      return this.shoes[i].name;
    }
  }

  ngOnInit() {
    this.subscription = this.orderService.basketChanged.subscribe(
      (orderRows: order_Rows[]) => {
        this.order_rows = orderRows;
      }
    );
    this.getBasketOrders();
    // this.subscription = this.orderService.verifiedCustomer.subscribe(el => {
    //   this.checkout = el;
    // });

    this.order_rows.forEach(el => {
      this.productService
        .getShoe(el.shoeId)
        .subscribe(shoes => this.shoes.push(shoes));
    });
  }

  getBasketOrders(): void {
    this.order_rows = this.orderService.getBasketOrders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitOrder() {
    var orderToSend = {
      order_Rows: this.order_rows
    };
    this.orderService.sendCustomerOrder(orderToSend).subscribe(() => {
      this.alertify.success(`Your order is sent!`);
      this.orderService.emptyBasketOrders();
      this.checkout = false;
    });
  }
}
