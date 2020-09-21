import { NgModule } from "@angular/core";
import { SearchShowsService } from "./car-details.service";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "./auth-guard.service";

@NgModule({
  imports: [CommonModule],
  providers: [SearchShowsService, AuthGuard]
})
export class ServicesModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
