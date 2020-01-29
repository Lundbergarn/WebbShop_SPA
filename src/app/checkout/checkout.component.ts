import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

import { OrderService } from "../_services/order.service";
import { ProductService } from "../_services/product.service";
import { CustomerService } from "../_services/customer.service";
import { AlertifyService } from "../_services/alertify.service";
import { orderRows } from "../_models/orderRows";
import { Router } from "@angular/router";
import { Shoe } from "../_models/shoe";
import { Customer } from "../_models/customer";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  orderRows: orderRows[];
  checkout: boolean = false;
  customerData: any = {};
  totalPrice: number = 0;
  shoes: Shoe[] = [];
  model: any = {};

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
      this.customerService.getCustomer().subscribe(
        (customer: Customer) => {
          this.model.FirstName = customer.firstName;
          this.model.LastName = customer.lastName;
          this.model.Phone = customer.phone;
          this.model.Address = customer.address;

          this.customerData = customer;
        },
        error => {
          this.alertify.error(error);
        }
      )
    );

    this.orderRows.forEach((orderRow, index) => {
      this.subs.add(
        this.productService.getShoe(orderRow.shoeId).subscribe(
          (shoe: Shoe) => {
            this.shoes.push(shoe);
            this.totalPrice += this.orderRows[index].qty * shoe.price;
          },
          error => {
            this.alertify.error(error);
          }
        )
      );
    });
  }

  submitOrder() {
    if (!localStorage.getItem("token")) {
      this.alertify.warning("You need to log in first");
      return;
    }

    // Check if no user changes
    if (
      this.customerData.firstName !== this.model.FirstName ||
      this.customerData.lastName !== this.model.LastName ||
      this.customerData.phone !== this.model.Phone ||
      this.customerData.address !== this.model.Address
    ) {
      this.subs.add(
        this.customerService.sendCustomerData(this.model).subscribe(
          () => {
            this.alertify.success("Userdata updated");
          },
          error => {
            this.alertify.error(error);
          }
        )
      );
    }

    let orderToSend = {
      orderRows: this.orderRows
    };

    this.subs.add(
      this.orderService.sendCustomerOrder(orderToSend).subscribe(
        () => {
          this.alertify.success(`Your order is sent!`);
          this.orderService.emptyBasketOrders();
          this.checkout = false;
          this.orderRows = [];
          this.router.navigate(["orders"]);
        },
        error => {
          this.alertify.error(error);
        }
      )
    );
  }

  handleRoute() {
    this.router.navigate(["basket"]);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
