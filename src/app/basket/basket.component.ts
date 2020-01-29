import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { SubSink } from "subsink";

import { OrderService } from "../_services/order.service";
import { orderRows } from "../_models/orderRows";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"]
})
export class BasketComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  orderRows: orderRows[];
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

  ngOnInit() {
    this.subs.add(
      this.orderService.basketChanged.subscribe((orderRows: orderRows[]) => {
        this.orderRows = orderRows;
      })
    );

    this.getBasketOrders();

    this.orderRows.forEach(el => {
      let data = { qty: null, size: null, color: null, shoe: null };

      // Get shoe, size and color for every product
      this.subs.add(
        this.productService.getShoe(el.shoeId).subscribe(shoe => {
          data.qty = el.qty;

          this.subs.add(
            this.productService
              .getSize(el.sizeId)
              .subscribe(size => (data.size = size))
          );

          this.subs.add(
            this.productService
              .getColor(el.colorId)
              .subscribe(color => (data.color = color))
          );

          data.shoe = shoe;
        })
      );

      this.basketData.push(data);
    });

    // Check if logged in on enter
    if (localStorage.getItem("token")) {
      this.verified = true;
    }

    // Check if logging in
    this.subs.add(
      this.orderService.verifiedCustomer.subscribe(el => {
        this.verified = el;
      })
    );
  }

  getBasketOrders(): void {
    this.orderRows = this.orderService.getBasketOrders();
  }

  changeQuantity(id, value) {
    this.orderService.updateQuantity(id, value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  handleRoute() {
    this.router.navigate(["checkout"], { relativeTo: this.route });
  }

  removeProduct(id: number) {
    this.orderService.removeProduct(id);

    this.basketData.splice(id, 1);
  }
}
