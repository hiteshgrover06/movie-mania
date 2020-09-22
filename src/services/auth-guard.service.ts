import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { getCookie } from "../app/utils/cookie-helpers.utils";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (getCookie(`showbiz_cookie`)) {
      return true;
    }

    // navigate to login page
    this._router.navigate([`/login`]);
    return false;
  }
}
