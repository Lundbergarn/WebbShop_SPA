import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./product_list/product_list.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductDetailComponent } from "./product_detail/product_detail.component";
import { AdminComponent } from "./admin/admin.component";
import { BasketComponent } from "./basket/basket.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { AuthGuard } from "./_guards/auth.guard";

const appRoutes: Routes = [
  { path: "", redirectTo: "/start", pathMatch: "full" },
  { path: "start", component: HomeComponent },
  { path: "products", component: ProductListComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "orders", component: OrdersComponent, canActivate: [AuthGuard] },
  { path: "basket", component: BasketComponent },
  {
    path: "basket/checkout",
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  { path: "admin", component: AdminComponent },
  { path: "**", redirectTo: "/start" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
