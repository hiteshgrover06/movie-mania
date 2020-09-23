import { Component, OnDestroy, OnInit } from "@angular/core";

import {
  SearchShowsService,
  ShowDetail,
  Shows,
} from "src/services/search-shows.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

const GENRES = [
  "Drama",
  "Thriller",
  "Romance",
  "Music",
  "Comedy",
  "History",
  "Sports",
];

@Component({
  selector: "app-show-list",
  templateUrl: "./show-list.component.html",
  styleUrls: ["./show-list.component.css"],
})
export class ShowListComponent implements OnInit, OnDestroy {
  constructor(
    private readonly searchService: SearchShowsService,
    private readonly router: Router
  ) {}

  skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  defaultGenres = GENRES;
  selectedCar: ShowDetail;
  searchResults: Shows;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.getShowsData();
    }, 2000);
  }

  // destroy all explicit subscriptions
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getGenres(): string[] {
    return Object.keys(this.searchResults) || [];
  }

  // make api call to get all shows
  getShowsData() {
    this.subscriptions.push(
      this.searchService
        .getShowsBasedOnGenre()
        .subscribe((data: ShowDetail[]) => {
          this.setSearchResultsBasedOnCategory(data);
        })
    );
  }

  // navigate to the selected show detail
  goToDetailsPage($event: Event, showId: number) {
    $event.preventDefault();
    this.router.navigateByUrl(`/show/${showId}`);
  }

  // process all shows data based on category set
  private setSearchResultsBasedOnCategory(data: ShowDetail[]) {
    this.searchResults = {};
    data.forEach((show: ShowDetail) => {
      show.genres.forEach((genre) => {
        if (GENRES.includes(genre)) {
          if (this.searchResults[genre]) {
            this.searchResults[genre].push(show);
          } else {
            this.searchResults[genre] = [];
            this.searchResults[genre].push(show);
          }
        }
      });
    });
    Object.entries(this.searchResults).forEach((shows) =>
      shows[1].sort((a: ShowDetail, b: ShowDetail) => {
        return b.rating.average - a.rating.average;
      })
    );
  }
}
