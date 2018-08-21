import { Component } from "@angular/core";
import {Page} from "ui/page";
import { User } from "./shared/user/user";
import { UserService } from "./shared/user/user.service";
import { WebsocketService } from "./shared/websocket/websocket.service";
import { Store } from "@ngrx/store";
import { AppState } from "./store/store.interface";
// import { Observable } from "rxjs/Observable";
import { SETTOKEN } from "./store/user.reducer";
import { Router } from "@angular/router";
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from 'nativescript-bottom-navigation';

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

if (!localStorage.getItem('token')) {
    console.log('token doesnt exist');
    localStorage.setItem('token', 'NONE');
}
// <BottomNavigation activeColor="red"
// inactiveColor="yellow"
// backgroundColor="black"
// keyLineColor="black"
// (tabSelected)="onBottomNavigationTabSelected($event)"
// row="1">
//     <BottomNavigationTab title="First" icon="ic_home"></BottomNavigationTab>
//     <BottomNavigationTab title="Second" icon="ic_view_list"></BottomNavigationTab>
//     <BottomNavigationTab title="Third" icon="ic_menu"></BottomNavigationTab>
// </BottomNavigation>
@Component({
    selector: "main",
    template: `
    <page-router-outlet></page-router-outlet>
    `,
    providers: [WebsocketService],
})
export class AppComponent {
    user: User;
    isLoggingIn = true;
    private webSocket;
    protected router: Router;
    // public tabs: BottomNavigationTab[] = [
    //     new BottomNavigationTab('First', 'ic_home'),
    //     new BottomNavigationTab('Second', 'ic_view_list'),
    //     new BottomNavigationTab('Third', 'ic_menu')
    // ];
     
    constructor(page: Page, private store: Store<AppState>, private r: Router) {
        this.router = r;
        page.actionBarHidden = true;
        this.webSocket = WebsocketService.Instance(this.store);
        this.init();
    }

    init() {
        // read token from localstorage and jump to the page
        let token = localStorage.getItem('token');
        let self = this;
        this.store.select('user').subscribe(function (res) { 
            if (res.token == 'NONE') {
                self.router.navigate(["/login"]); 
            }
        });        
        this.store.dispatch({ type: SETTOKEN, payload: token});
        if(token != 'NONE') {
            this.router.navigate(["/main"]); 
        }
    }

    ngOnDestroy() {
        console.log('destory');
    }

    onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
        console.log(`Tab selected:  ${args.oldIndex}`);
    }
}
