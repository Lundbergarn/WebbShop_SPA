import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { OrderService } from "../order.service";
import { orderRows } from "../_models/orderRows";
import { AlertifyService } from "../_services/alertify.service";
import { CustomerService } from "../customer.service";
import { Router } from "@angular/router";
import { Shoe } from "../_models/shoe";
import { ProductService } from "../product.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  orderRows: orderRows[];
  subscription: Subscription;
  checkout: boolean = false;

  shoes: Shoe[] = [];
  model: any = {};
  customerData: any = {};
  totalPrice: number = 0;

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderRows = this.orderService.getBasketOrders();

    this.orderService.getCustomer().subscribe(el => {
      this.model.FirstName = el.firstName;
      this.model.LastName = el.lastName;
      this.model.Phone = el.phone;
      this.model.Address = el.address;

      this.customerData = el;
    });

    this.orderRows.forEach((el, index) => {
      this.productService.getShoe(el.shoeId).subscribe(shoe => {
        this.shoes.push(shoe);
        this.totalPrice += this.orderRows[index].qty * shoe.price;
      });
    });
  }

  submitOrder() {
    if (!localStorage.getItem("token")) {
      this.alertify.warning("You need to log in first");
      return;
    }

    this.router.navigate(["orders"]);
    // Check if no user changes
    if (
      this.customerData.firstName !== this.model.FirstName ||
      this.customerData.lastName !== this.model.LastName ||
      this.customerData.phone !== this.model.Phone ||
      this.customerData.address !== this.model.Address
    ) {
      this.customerService.sendCustomerData(this.model).subscribe(() => {
        this.alertify.success("Userdata updated");
      });
    }

    var orderToSend = {
      orderRows: this.orderRows
    };

    this.orderService.sendCustomerOrder(orderToSend).subscribe(() => {
      this.alertify.success(`Your order is sent!`);
      this.orderService.emptyBasketOrders();
      this.checkout = false;
      this.orderRows = [];
    });
  }
}
