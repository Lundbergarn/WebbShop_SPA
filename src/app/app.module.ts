import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { NavComponent } from "./nav/nav.component";
import { AuthService } from "./_services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import { ValueComponent } from "./value/value.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatCard,
  MatCardTitle,
  MatDivider,
  MatCardImage,
  MatGridList,
  MatCardSubtitle,
  MatCardContent
} from "@angular/material/";
import { Product_listComponent } from "./product_list/product_list.component";
import { Product_detailComponent } from "./product_detail/product_detail.component";
import { AppRoutingModule } from "./app-routing.module";
import { OrdersComponent } from "./orders/orders.component";
import { Product_itemComponent } from "./product_list/product_item/product_item.component";
import { AdminComponent } from "./admin/admin.component";
import { ProductService } from "./product.service";
import { OrderService } from "./order.service";
import { BasketComponent } from "./basket/basket.component";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ValueComponent,
    MatCard,
    MatCardTitle,
    MatDivider,
    MatCardImage,
    MatGridList,
    MatCardSubtitle,
    MatCardContent,
    Product_listComponent,
    Product_itemComponent,
    Product_detailComponent,
    OrdersComponent,
    AdminComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    ProductService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
