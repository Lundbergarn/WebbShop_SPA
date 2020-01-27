import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { ProductService } from "../product.service";
import { OrderService } from "../order.service";
import { orderRows } from "../_models/orderRows";
import { AlertifyService } from "../_services/alertify.service";
import { Shoe } from "../_models/shoe";
import { Size } from "../_models/size";
import { Color } from "../_models/color";

@Component({
  selector: "app-product_detail",
  templateUrl: "./product_detail.component.html",
  styleUrls: ["./product_detail.component.css"]
})
export class Product_detailComponent implements OnInit {
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
    this.route.params.subscribe((params: Params) => {
      this.getShoe(params["id"]);
      this.getSizes();
      this.getColors();
    });
  }

  getShoe(id: number): void {
    this.isLoading = true;
    this.productService.getShoe(id).subscribe(shoe => {
      this.shoe = shoe;
      this.isLoading = false;
    });
  }

  getSizes(): void {
    this.productService.getSizes().subscribe(res => {
      this.sizes = res;
    });
  }

  getColors(): void {
    this.productService.getColors().subscribe(res => {
      this.colors = res;
    });
  }

  addToCard() {
    this.orderRow.shoeId = this.shoe.id; // Shoe ID
    this.orderRow.qty = 1;
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
}
