
import { User } from "./user";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import { Store } from "@ngrx/store";
import { AppState  } from "./../../store/store.interface";
import { SETTOKEN  } from "./../../store/user.reducer";
import { Config } from "../interfaces/config.interface";
let config: Config = require('./../config.json');

@Injectable()
export class UserService {
    constructor(private http: Http, private store:Store<AppState>) { }

    register(user: User) {
        alert("About to register: " + user.email);
    }

    login(user: User) {
        console.log('user service123');
        return this.http.post(
          config.restApiUrl + "/accessToken",
          JSON.stringify({
            grant_type: 'password',
            client_id: '6',
            client_secret: '3FGAU0peIBuIjdrazcaKpb2LzypqIRwuJfjiPENN',
            scope: '*',
            username: user.email,
            password: user.password
          }),
          { headers: this.getCommonHeaders() }
        )
        .map(response => response.json())
        .do(data => {
           // console.dir(data);
           this.store.dispatch({ type: SETTOKEN, payload: data.access_token});
           localStorage.setItem('token', data.access_token);
           this.store.select('user').subscribe(function (res) { return console.dir(res); });
        })
        .catch(this.handleErrors);
    }

    getCommonHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", '');
        return headers;
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
    
}