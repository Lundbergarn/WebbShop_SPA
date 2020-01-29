import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { SubSink } from "subsink";
import { Router } from "@angular/router";

import { AlertifyService } from "../_services/alertify.service";
import { CustomerService } from "../_services/customer.service";
import { OrderService } from "../_services/order.service";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Output() cancelRegister = new EventEmitter();
  subs = new SubSink();
  model: any = {};
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    this.subs.add(
      this.authService.register(this.model, "customer/auth").subscribe(
        () => {
          this.alertify.success("Registration successfull");
          this.cancel();
          this.isLoading = true;

          this.subs.add(
            this.authService.login(this.model, "customer/auth").subscribe(
              () => {
                this.customerService.setUserName(this.model.UserName);

                this.alertify.success("Logged in successfully");
                this.orderService.loggedIn();
                this.isLoading = false;
                this.router.navigate(["products"]);
              },
              error => {
                this.alertify.error(error);
                this.isLoading = false;
              }
            )
          );
        },
        error => {
          this.alertify.error(error);
        }
      )
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
