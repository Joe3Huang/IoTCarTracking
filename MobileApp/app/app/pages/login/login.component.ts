import { Component } from "@angular/core";
// import {Page} from "ui/page";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";

@Component({
    selector: "login",
   //  moduleId: module.id,
    providers: [UserService],
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class LoginComponent {
    // Your TypeScript logic goes here
    user: User;
    isLoggingIn = true;
    constructor(private router: Router, private userService: UserService) {
        // page.actionBarHidden = true;
        this.user = new User();
        console.dir(this.user);
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
          } else {
            this.signUp();
          }
    }

    login() {
        console.log('log in emthod');
        this.userService.login(this.user).subscribe(res => { 
            this.router.navigate(["/main"])   
        },
        (error) => alert("Unfortunately we could not find your account.")
    );
    }

    signUp() {
        this.userService.register(this.user);
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
