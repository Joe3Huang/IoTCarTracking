import { Component } from "@angular/core";
// import {Page} from "ui/page";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { WebsocketService } from "../../shared/websocket/websocket.service";

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
    constructor(private userService: UserService, private ws: WebsocketService) {
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
        // TODO: Define
    }

    signUp() {
        this.userService.register(this.user);
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
