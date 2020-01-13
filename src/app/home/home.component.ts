import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "../product.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode: boolean;

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
