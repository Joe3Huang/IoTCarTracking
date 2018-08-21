import { Component } from "@angular/core";
import { WebsocketService } from "../../shared/websocket/websocket.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { INCREMENT, DECREMENT, RESET } from "./../../store/counter.reducer";
import { AppState } from "./../../store/store.interface";


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
    counter$: Observable<number>;
    constructor(private store: Store<AppState>) {
        // page.actionBarHidden = true;
        this.webSocket = WebsocketService.Instance(this.store);
        this.counter$ = store.select(s => s.counter);
    }

    submit() {
        console.log(this.deviceCode);
    }

    public increment() {
        this.store.dispatch({ type: INCREMENT });
    }

    public decrement() {
        this.store.dispatch({ type: DECREMENT });
    }

    public reset() {
        this.store.dispatch({ type: RESET });
    }
}
