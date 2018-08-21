import { Component, OnInit } from "@angular/core";
import {Page} from "ui/page";
import { User } from "./shared/user/user";
import { UserService } from "./shared/user/user.service";
import { WebsocketService } from "./shared/websocket/websocket.service";
// import { FilesystemService } from "./shared/filesystem/filesystem.service";
import { Store } from "@ngrx/store";
import { AppState } from "./store/store.interface";

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums"; // used to describe at what accuracy the location should be get
require( "nativescript-localstorage" );
import { SETPOSITION } from "./store/socket.reducer";


// console.log('localStorage -- setup');
if (!localStorage.getItem('device_code')) {
   // console.log('device_code doesnt exist');
    localStorage.setItem('device_code', 'NONE');
}

if (!localStorage.getItem('random_link_ucode')) {
   // console.log('random_link_ucode doesnt exist');
    localStorage.setItem('random_link_ucode', 'NONE');
}



@Component({
    selector: "main",
    template: "<page-router-outlet></page-router-outlet>",
    providers: [WebsocketService],
})
// @Component({
//     selector: "main",
//     template: "1234",
//     // providers: [WebsocketService],
// })
export class AppComponent implements OnInit {
    user: User;
    isLoggingIn = true;
    private webSocket;
    constructor(page: Page, private store: Store<AppState>) {
        page.actionBarHidden = true;
        this.webSocket = WebsocketService.Instance(this.store);
        
    }

    ngOnInit(): void {
        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(enabled => {
            //console.log('isEnabled =', enabled);
            if (enabled) {
               this.watch();
            } else {
               this.request();
            }
        }, e => {
           // console.log('isEnabled error', e);
            this.request();
        });
    }

    request() {
        //console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(() => {
            // console.log('location enabled!');
            this.watch();
        }, e => {
            // console.log('Failed to enable', e);
        });
    }

    watch() {
        // console.log('watchLocation()');
        geolocation.watchLocation(position => {
            //console.dir(position);
            this.store.dispatch({ type: SETPOSITION, payload:  position });
        }, e => {
           // console.log('failed to get location');
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 10000,
            maximumAge : 20000,
            updateDistance: 5,
            updateTime : 5000,
        });
    }

}
