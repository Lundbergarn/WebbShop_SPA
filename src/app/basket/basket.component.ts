import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

import { OrderService } from "../order.service";
import { orderRows } from "../_models/orderRows";
import { ProductService } from "../product.service";

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

  quantitys: number[] = [];

  basketData = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // To not get undefined from shoe URL in HTML loop
  // shoeData(i: number, type: string) {
  //   if (
  //     this.shoes[i] == undefined ||
  //     this.colors[i] == undefined ||
  //     this.sizes[i] == undefined
  //   ) {
  //     return null;
  //   }
  //   if (type == "shoe") {
  //     return this.shoes[i].imageUrl;
  //   } else if (type == "price") {
  //     return this.shoes[i].price;
  //   } else if (type == "color") {
  //     return this.colors[i].colorDescription;
  //   } else if (type == "size") {
  //     return this.sizes[i].sizeDescription;
  //   } else {
  //     return this.shoes[i].name;
  //   }
  // }

  ngOnInit() {
    this.subscription = this.orderService.basketChanged.subscribe(
      (orderRows: orderRows[]) => {
        this.orderRows = orderRows;
      }
    );
    this.getBasketOrders();

    this.orderRows.forEach(el => {
      let data = {
        qty: null,
        size: null,
        color: null,
        shoe: null
      };

      // Subscribe one shoe at a time
      this.productService.getShoe(el.shoeId).subscribe(shoe => {
        data.qty = el.qty;

        this.productService
          .getSize(el.sizeId)
          .subscribe(size => (data.size = size));

        this.productService
          .getColor(el.colorId)
          .subscribe(color => (data.color = color));

        data.shoe = shoe;
      });

      this.basketData.push(data);
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

  changeQuantity(id, value) {
    this.orderService.updateQuantity(id, value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleRoute() {
    this.router.navigate(["checkout"], { relativeTo: this.route });
  }

  removeProduct(id: number) {
    this.orderService.removeProduct(id);

    this.basketData.splice(id, 1);
  }
}
