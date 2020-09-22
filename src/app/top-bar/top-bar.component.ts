import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getCookie } from "../utils/cookie-helpers.utils";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent implements OnInit {
  constructor(private readonly router: Router) {}
  query: string;

  ngOnInit() {}

  onSearch() {
    this.router.navigateByUrl(`/search/${this.query}`);
  }

  isLoggedIn() {
    return !!getCookie(`showbiz_cookie`);
  }
}
