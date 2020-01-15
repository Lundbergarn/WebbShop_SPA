import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { Product_listComponent } from "./product_list/product_list.component";
import { OrdersComponent } from "./orders/orders.component";
import { Product_detailComponent } from "./product_detail/product_detail.component";
import { AdminComponent } from "./admin/admin.component";
import { BasketComponent } from "./basket/basket.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/start", pathMatch: "full" },
  { path: "start", component: HomeComponent },
  { path: "products/:id", component: Product_detailComponent },
  { path: "products", component: Product_listComponent },
  { path: "orders", component: OrdersComponent },
  { path: "basket", component: BasketComponent },
  { path: "admin", component: AdminComponent }
  // { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
