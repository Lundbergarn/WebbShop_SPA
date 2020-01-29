import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { Shoe } from "../_models/shoe";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-product_list",
  templateUrl: "./product_list.component.html",
  styleUrls: ["./product_list.component.css"]
})
export class Product_listComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  shoes: Shoe[];
  isLoading: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.isLoading = true;

    this.subs.add(
      this.productService.getShoes().subscribe(shoes => {
        this.shoes = shoes;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
