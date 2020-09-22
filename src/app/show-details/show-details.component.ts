import { Component, OnInit } from "@angular/core";

import {
  SearchShowsService,
  ShowDetail,
} from "src/services/search-shows.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-show-details",
  templateUrl: "./show-details.component.html",
  styleUrls: ["./show-details.component.css"],
})
export class ShowDetailsComponent implements OnInit {
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
