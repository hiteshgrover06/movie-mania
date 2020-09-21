import { Component, OnInit } from "@angular/core";

import {
  SearchShowsService,
  ShowDetail,
} from "src/services/car-details.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details-page.component.html",
  styleUrls: ["./product-details-page.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private readonly searchService: SearchShowsService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.showId = params[`id`];
    });
  }
  showDetail$: Observable<ShowDetail>;
  showId: number;

  ngOnInit() {
    // To simulate slow network or time consuming calls 
    setTimeout(() => {
      this.showDetail$ = this.searchService.getShowDetails(`${this.showId}`);
    }, 2000);
  }
}
