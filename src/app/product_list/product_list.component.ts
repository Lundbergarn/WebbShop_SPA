import { Component, OnInit } from "@angular/core";

import { Shoe } from "../_models/shoe";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product_list",
  templateUrl: "./product_list.component.html",
  styleUrls: ["./product_list.component.css"]
})
export class Product_listComponent implements OnInit {
  shoes: Shoe[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getShoes();
  }

  getShoes(): void {
    this.productService.getShoes().subscribe(shoes => (this.shoes = shoes));
  }
}
