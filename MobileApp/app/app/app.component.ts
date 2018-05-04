import { Component } from "@angular/core";
import {Page} from "ui/page";
import { User } from "./shared/user/user";
import { UserService } from "./shared/user/user.service";
import { WebsocketService } from "./shared/websocket/websocket.service";
import { Store } from "@ngrx/store";
import { AppState } from "./store/store.interface";
// import { Observable } from "rxjs/Observable";
// import { SETDEVICECODE, SETRUCODE  } from "./reducers/socket.reducer";

require( "nativescript-localstorage" );
//localStorage.clear();
console.log('localStorage');
//console.log("Keys stored", localStorage.length);
if (!localStorage.getItem('device_code')) {
    console.log('device_code doesnt exist');
    localStorage.setItem('device_code', 'NONE');
}
//Store.dispatch({ type: SETDEVICECODE });

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
    constructor(page: Page, private store: Store<AppState>) {
        page.actionBarHidden = true;
        this.webSocket = WebsocketService.Instance(this.store);
    }
}
