import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Shoe } from "src/app/_models/shoe";

@Component({
  selector: "app-product_item",
  templateUrl: "./product_item.component.html",
  styleUrls: ["./product_item.component.css"]
})
export class ProductItemComponent {
  @Input() shoe: Shoe;

  constructor(private router: Router, private route: ActivatedRoute) {}

  handleRoute(shoeName) {
    this.router.navigate([shoeName], { relativeTo: this.route });
  }
}
