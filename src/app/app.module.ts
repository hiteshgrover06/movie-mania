import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductDetailsComponent } from "./product-details-page/product-details-page.component";
import { ServicesModule } from "src/services/services.module";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: `dashboard`,
        component: ProductListComponent,
      },

      {
        path: `show/:id`,
        component: ProductDetailsComponent,
      },
    ]),
    HttpClientModule,
    ServicesModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
