import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";
import { CustomerService } from "../_services/customer.service";
import { OrderService } from "../_services/order.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
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
    this.authService.register(this.model, "customer/auth").subscribe(
      () => {
        this.alertify.success("Registration successfull");
        this.cancel();

        this.isLoading = true;
        this.authService.login(this.model, "customer/auth").subscribe(
          () => {
            this.customerService.setUserName(this.model.UserName);

            this.alertify.success("logged in successfully");
            this.orderService.loggedIn();
            this.isLoading = false;
            this.router.navigate(["products"]);
          },
          error => {
            this.alertify.error(error);
            this.isLoading = false;
          }
        );
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
