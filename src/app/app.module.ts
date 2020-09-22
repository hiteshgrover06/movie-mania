import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ShowListComponent } from "./show-list/show-list.component";
import { HttpClientModule } from "@angular/common/http";
import { ShowDetailsComponent } from "./show-details/show-details.component";
import { ServicesModule } from "src/services/services.module";
import { LoginFormComponent } from "./login-form/login-form.component";
import { AuthGuard } from "src/services/auth-guard.service";
import { SearchResultsComponent } from "./search-results/search-results.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: ``, component: LoginFormComponent },
      {
        path: `dashboard`,
        component: ShowListComponent,
        canActivate: [AuthGuard],
      },

      {
        path: `show/:id`,
        component: ShowDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: `search/:query`,
        component: SearchResultsComponent,
        canActivate: [AuthGuard],
      },
    ]),
    HttpClientModule,
    ServicesModule,
  ],
  declarations: [
    AppComponent,
    LoginFormComponent,
    TopBarComponent,
    ShowListComponent,
    ShowDetailsComponent,
    SearchResultsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
