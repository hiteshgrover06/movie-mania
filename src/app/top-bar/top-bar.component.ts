import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getCookie } from "../utils/cookie-helpers.utils";

const ENTER_KEY_CODE = 13;
@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent implements OnInit {
  constructor(private readonly router: Router) {}
  query: string;

  ngOnInit() {}

  doSearch() {
    this.router.navigateByUrl(`/search/${this.query}`);
  }

  onEnterKey(event: KeyboardEvent) {
    event.preventDefault();
    this.doSearch();
  }

  isLoggedIn() {
    return !!getCookie(`showbiz_cookie`);
  }
}
