import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { OrderService } from "../_services/order.service";
import { ProductService } from "../_services/product.service";
import { CustomerService } from "../_services/customer.service";
import { AlertifyService } from "../_services/alertify.service";
import { orderRows } from "../_models/orderRows";
import { Router } from "@angular/router";
import { Shoe } from "../_models/shoe";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  orderRows: orderRows[];
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

    this.subs.add(
      this.orderService.getCustomer().subscribe(el => {
        this.model.FirstName = el.firstName;
        this.model.LastName = el.lastName;
        this.model.Phone = el.phone;
        this.model.Address = el.address;

        this.customerData = el;
      })
    );

    this.orderRows.forEach((el, index) => {
      this.subs.add(
        this.productService.getShoe(el.shoeId).subscribe(shoe => {
          this.shoes.push(shoe);
          this.totalPrice += this.orderRows[index].qty * shoe.price;
        })
      );
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
      this.subs.add(
        this.customerService.sendCustomerData(this.model).subscribe(() => {
          this.alertify.success("Userdata updated");
        })
      );
    }

    var orderToSend = {
      orderRows: this.orderRows
    };

    this.subs.add(
      this.orderService.sendCustomerOrder(orderToSend).subscribe(() => {
        this.alertify.success(`Your order is sent!`);
        this.orderService.emptyBasketOrders();
        this.checkout = false;
        this.orderRows = [];
      })
    );
  }

  handleRoute() {
    this.router.navigate(["basket"]);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
