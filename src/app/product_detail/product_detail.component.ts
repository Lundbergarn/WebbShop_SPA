import { Component, OnInit } from "@angular/core";
import { Params, Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-product_detail",
  templateUrl: "./product_detail.component.html",
  styleUrls: ["./product_detail.component.css"]
})
export class Product_detailComponent implements OnInit {
  id: number;
  shoe: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];

      this.http.get("http://localhost:5000/api/shoe/" + this.id).subscribe(
        response => {
          this.shoe = response;
        },
        error => console.log(error)
      );
    });
  }
}
