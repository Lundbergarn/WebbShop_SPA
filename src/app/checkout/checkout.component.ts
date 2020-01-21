import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../order.service";
import { Subscription } from "rxjs";
import { orderRows } from "../_models/orderRows";
import { AlertifyService } from "../_services/alertify.service";
import { CustomerService } from "../customer.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  orderRows: orderRows[];
  subscription: Subscription;
  checkout: boolean = false;
  customer: string = "";

  model: any = {};
  customerData: any = {};

  constructor(
    private orderService: OrderService,
    private alertify: AlertifyService,
    private customerService: CustomerService,
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
  }

  submitOrder() {
    this.customer = this.customerService.getUserName();

    if (this.customer === "") {
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

      this.router.navigate(["orders"]);
    });
  }
}
