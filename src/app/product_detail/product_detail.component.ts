import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { ProductService } from "../product.service";
import { OrderService } from "../order.service";
import { orderRows } from "../_models/orderRows";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-product_detail",
  templateUrl: "./product_detail.component.html",
  styleUrls: ["./product_detail.component.css"]
})
export class Product_detailComponent implements OnInit {
  shoe = {
    id: null,
    image_Url: null,
    name: null,
    brand: null,
    price: null,
    productDescription: null
  };

  orderRow: orderRows = {
    qty: null,
    shoeId: null,
    orderId: null,
    shoe: null
  };

  contactMethods = [
    { id: 1, label: "Email" },
    { id: 2, label: "Blå" }
  ];
  contact = {
    firstName: "CFR",
    comment: "No comment",
    subscribe: true,
    contactMethod: 2 // this id you'll send and get from backend
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
    });
  }

  getShoe(id: number): void {
    this.productService.getShoe(id).subscribe(shoe => (this.shoe = shoe));
  }

  addToCard() {
    this.orderRow.shoeId = this.shoe.id; // Shoe ID
    this.orderRow.qty = 1;
    this.orderRow.orderId = 1; // Customer ID

    this.orderService.addProduct(this.orderRow);
    this.alertify.success(`Added ${this.shoe.name} to the basket.`);
  }
}
