import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import {
  SearchDetail,
  SearchShowsService,
} from "src/services/search-shows.service";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"],
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private readonly searchService: SearchShowsService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) {}
  searchResults$: Observable<SearchDetail[]>;
  query: string;

  ngOnInit() {
    this.activeRoute.params.subscribe((routeParams) => {
      this.query = routeParams && routeParams[`query`];
      if (this.query) {
        // To simulate slow network or time consuming calls
        this.searchResults$ = this.searchService.searchShows(
          `${this.query.trim()}`
        );
      }
    });
  }

  getSortedResults(results: SearchDetail[]): SearchDetail[] {
    return results.sort((a: SearchDetail, b: SearchDetail) => {
      return b.show.rating.average - a.show.rating.average;
    });
  }

  // navigate to the selected show detail
  goToDetailsPage($event: Event, showId: number) {
    $event.preventDefault();
    this.router.navigateByUrl(`/show/${showId}`);
  }
}
