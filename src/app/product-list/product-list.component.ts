import { Component, OnInit } from "@angular/core";

import {
  SearchShowsService,
  ShowDetail,
  Shows,
} from "src/services/car-details.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

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
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  constructor(
    private readonly searchService: SearchShowsService,
    private readonly router: Router
  ) {}

  skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  defaultGenres = GENRES;
  selectedCar: ShowDetail;
  searchResults: Shows;

  ngOnInit() {
    setTimeout(() => {
      this.searchService
        .getShowsBasedOnGenre()
        .subscribe((data: ShowDetail[]) => {
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
        });
    }, 2000);
  }

  getGenres(): string[] {
    return Object.keys(this.searchResults) || [];
  }

  goToDetailsPage( $event: Event, showId: number) {
    $event.preventDefault();
    this.router.navigateByUrl(`/show/${showId}`);
  }
}