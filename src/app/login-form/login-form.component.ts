import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { setCookie } from "../utils/cookie-helpers.utils";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  loginMessage = "";
  loginForm = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  });

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    const user = localStorage.getItem(`${this.loginForm.value.userName}`);

    if (user) {
      this.loginMessage = "Login Successful.. redirecting now.";
      this.navigateToDashboard();
    } else {
      this.loginMessage = "Please sign up now to create account!";
    }
  }

  signupCallback() {
    const userData = this.loginForm.value;
    localStorage.setItem(`${userData.userName}`, JSON.stringify(userData));
    this.loginMessage = "Account created successfully.. redirecting now.";
    this.navigateToDashboard();
  }

  private navigateToDashboard(): void {
    this.loginForm.reset();
    setTimeout(() => {
      setCookie("snappcar_user", "valid");
      this.router.navigate(["/dashboard"]);
    }, 1000);
  }
}
