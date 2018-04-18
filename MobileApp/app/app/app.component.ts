import { Component } from "@angular/core";
import {Page} from "ui/page";
import { User } from "./shared/user/user";
import { UserService } from "./shared/user/user.service";
import { WebsocketService } from "./shared/websocket/websocket.service";


require( "nativescript-localstorage" );
//localStorage.clear();
console.log('localStorage');
//console.log("Keys stored", localStorage.length);
if (!localStorage.getItem('device_code')) {
    console.log('device_code doesnt exist');
    localStorage.setItem('device_code', 'NONE');
}

if (!localStorage.getItem('random_link_ucode')) {
    console.log('random_link_ucode doesnt exist');
    localStorage.setItem('random_link_ucode', 'NONE');
}

@Component({
    selector: "main",
    template: "<page-router-outlet></page-router-outlet>",
    providers: [WebsocketService],
})
export class AppComponent {
    // Your TypeScript logic goes here
    user: User;
    isLoggingIn = true;
    private webSocket;
    constructor(page: Page) {
        page.actionBarHidden = true;
        this.webSocket = WebsocketService.Instance;
    }
}
