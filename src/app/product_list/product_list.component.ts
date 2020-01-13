import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Shoe } from "../shoe.model";
import { ProductService } from "../product.service";

import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-product_list",
  templateUrl: "./product_list.component.html",
  styleUrls: ["./product_list.component.css"]
})
export class Product_listComponent implements OnInit {
  shoes: Shoe[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getShoes();
  }

  getShoes(): void {
    this.productService.getShoes().subscribe(shoes => (this.shoes = shoes));
  }
}
