import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { Shoe } from "../_models/shoe";
import { ProductService } from "../_services/product.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-product_list",
  templateUrl: "./product_list.component.html",
  styleUrls: ["./product_list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  shoes: Shoe[];
  isLoading: boolean;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadProducts();
  }

  loadProducts() {
    this.subs.add(
      this.productService.getShoes().subscribe(
        (shoes: Shoe[]) => {
          this.shoes = shoes;
          this.isLoading = false;
        },
        error => {
          this.alertify.error(error);
          this.isLoading = false;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
