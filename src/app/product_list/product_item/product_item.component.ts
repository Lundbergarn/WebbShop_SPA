import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Shoe } from "src/app/_models/shoe";

@Component({
  selector: "app-product_item",
  templateUrl: "./product_item.component.html",
  styleUrls: ["./product_item.component.css"]
})
export class Product_itemComponent implements OnInit {
  @Input() shoe: Shoe;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  handleRoute(shoeName) {
    this.router.navigate([shoeName], { relativeTo: this.route });
  }
}
