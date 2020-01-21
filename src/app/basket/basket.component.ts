import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

import { OrderService } from "../order.service";
import { orderRows } from "../_models/orderRows";
import { ProductService } from "../product.service";
import { Shoe } from "../_models/shoe";
import { CustomerService } from "../customer.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"]
})
export class BasketComponent implements OnInit, OnDestroy {
  orderRows: orderRows[];
  subscription: Subscription;
  checkout: boolean = false;
  verified: boolean = false;

  shoes: Shoe[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  // To not get undefined from shoe URL in HTML loop
  shoeData(i: number, type: string) {
    if (this.shoes[i] == undefined) {
      return null;
    }
    if (type == "shoe") {
      return this.shoes[i].imageUrl;
    } else if (type == "price") {
      return this.shoes[i].price;
    } else {
      return this.shoes[i].name;
    }
  }

  ngOnInit() {
    this.subscription = this.orderService.basketChanged.subscribe(
      (orderRows: orderRows[]) => {
        this.orderRows = orderRows;
      }
    );
    this.getBasketOrders();

    this.orderRows.forEach(el => {
      this.productService
        .getShoe(el.shoeId)
        .subscribe(shoes => this.shoes.push(shoes));
    });

    // Check if logged in on enter
    if (localStorage.getItem("token")) {
      this.verified = true;
    }
    // Check if logging in
    this.orderService.verifiedCustomer.subscribe(el => {
      this.verified = el;
    });
  }

  getBasketOrders(): void {
    this.orderRows = this.orderService.getBasketOrders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleRoute() {
    this.router.navigate(["checkout"], { relativeTo: this.route });
  }
}
