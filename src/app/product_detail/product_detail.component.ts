import { Component, OnInit, OnDestroy } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { SubSink } from "subsink";

import { AlertifyService } from "../_services/alertify.service";
import { ProductService } from "../_services/product.service";
import { OrderService } from "../_services/order.service";
import { orderRows } from "../_models/orderRows";
import { Shoe } from "../_models/shoe";
import { Size } from "../_models/size";
import { Color } from "../_models/color";

@Component({
  selector: "app-product_detail",
  templateUrl: "./product_detail.component.html",
  styleUrls: ["./product_detail.component.css"]
})
export class Product_detailComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  isLoading: boolean = false;
  sizes: Size[];
  colors: Color[];
  size = { id: 106 };
  color = { id: 101 };

  shoe: Shoe = {
    id: null,
    imageUrl: null,
    name: null,
    brand: null,
    price: null,
    productDescription: null
  };

  orderRow: orderRows = {
    qty: null,
    shoeId: null,
    orderId: null,
    sizeId: null,
    colorId: null,
    size: null,
    color: null,
    shoe: null
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.route.params.subscribe((params: Params) => {
        this.getShoe(params["id"]);
        this.getSizes();
        this.getColors();
      })
    );
  }

  getShoe(id: number): void {
    this.isLoading = true;
    this.subs.add(
      this.productService.getShoe(id).subscribe(shoe => {
        this.shoe = shoe;
        this.isLoading = false;
      })
    );
  }

  getSizes(): void {
    this.subs.add(
      this.productService.getSizes().subscribe(res => {
        this.sizes = res;
      })
    );
  }

  getColors(): void {
    this.subs.add(
      this.productService.getColors().subscribe(res => {
        this.colors = res;
      })
    );
  }

  addToCard() {
    this.orderRow.shoeId = this.shoe.id; // Shoe ID
    this.orderRow.qty = 1; // Quantity
    this.orderRow.orderId = 1; // Customer ID
    this.orderRow.sizeId = this.size.id; // Size ID
    this.orderRow.colorId = this.color.id; // Color ID

    this.orderService.addProduct(this.orderRow);
    this.alertify.success(`Added ${this.shoe.name} to the basket.`);
    this.orderRow = {
      qty: null,
      shoeId: null,
      orderId: null,
      sizeId: null,
      colorId: null,
      size: null,
      color: null,
      shoe: null
    };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
