import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { SETTOKEN  } from "./../../store/user.reducer";
import { AppState  } from "./../../store/store.interface";
import {Page} from "ui/page";
@Component({
    selector: "main",
    template: `
    <StackLayout>
        <Label text="Main page" left="10" top="10" width="100" height="100" backgroundColor=""></Label>
        <Button text="Testggh" (tap)="test()"></Button>
    </StackLayout>
    `,
    styles: ['Button {color: white;background-color: #CB1D00;}']
})

export class MainComponent {
    constructor(private store:Store<AppState>, page: Page) {
        page.actionBarHidden = true;
        console.log('main page');
    }

    test () {
        localStorage.setItem('token', 'NONE');
        this.store.dispatch({ type: SETTOKEN, payload: 'NONE'});
        this.store.select('user').subscribe(function (res) { return console.dir(res); });
    }
}
