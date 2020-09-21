import { Component, OnInit } from "@angular/core";

import {
  SearchShowsService,
  ShowDetail,
  Shows,
} from "src/services/car-details.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { getRentalCost, RentalPrice } from "../utils/rental.utils";
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

  rentalCost: RentalPrice;
  selectedCar: ShowDetail;

  searchResults: Shows;

  rentalPrice: Observable<unknown>;

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

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
