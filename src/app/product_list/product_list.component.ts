import { Component, OnInit } from "@angular/core";

import { Shoe } from "../_models/shoe";
import { ProductService } from "../product.service";
import { AlertifyService } from "../_services/alertify.service";
import { Size } from "../_models/size";

@Component({
  selector: "app-product_list",
  templateUrl: "./product_list.component.html",
  styleUrls: ["./product_list.component.css"]
})
export class Product_listComponent implements OnInit {
  shoes: Shoe[];
  isLoading: boolean;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getShoes();
  }

  getShoes(): void {
    this.isLoading = true;
    this.productService.getShoes().subscribe(res => {
      this.shoes = res;
      this.isLoading = false;
    });
  }
}
