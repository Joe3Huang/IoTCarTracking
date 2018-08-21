import { Component } from "@angular/core";
// import {Page} from "ui/page";
// import { User } from "../../shared/user/user";
// import { UserService } from "../../shared/user/user.service";
import { WebsocketService } from "../../shared/websocket/websocket.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from "./../../store/store.interface";
import { SETDEVICECODE } from "./../../store/socket.reducer";

@Component({
    selector: "login",
   //  moduleId: module.id,
    providers: [WebsocketService],
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class LoginComponent {
    // Your TypeScript logic goes here
    deviceCode = '';
    webSocket;
    public state;
    public stateTemp;
    // counter$: Observable<number>;
    constructor(private store: Store<AppState>) {
        var self = this;
        this.webSocket = WebsocketService.Instance(this.store);
        this.store.select<AppState>(state => state).subscribe(data => {
            self.state = data;
            self.stateTemp = JSON.stringify(self.state.socket.message);
            //  console.log('LoginComponent-----state.socket----', self.state.socket.message);
        });
        // this.state = this.store.select<AppState>(state => {return state}).subscribe(data => {
        //     console.log('LoginComponent-----state.socket----');
        //     return data;
        // });
        // this.store.select(state => state.socket).subscribe(data => {
        //     console.log('LoginComponent-----state.socket----', data.message);
        //     self.stateTemp = JSON.stringify(data.message);
        // });
        // this.getValueFromObservable().subscribe(data => {
        //     //console.log('LoginComponent-----state.socket----');
        //     this.state = data;
        //     //this.stateTemp = JSON.stringify(this.state.socket.message);
        // });
        // console.log('-----------LoginComponent-state--------------');
    }

    getValueFromObservable():Observable<AppState> {
        return this.store.select<AppState>(state => state);
    }

    public connect() {
        // console.log(this.deviceCode);
        this.store.dispatch({ type: SETDEVICECODE, payload: this.deviceCode});
        localStorage.setItem('device_code', this.deviceCode);
    }

    public test() {
        this.webSocket.connect();
    }
}
