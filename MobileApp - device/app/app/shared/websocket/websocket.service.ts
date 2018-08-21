import { Injectable } from "@angular/core";
import { Config } from "../interfaces/config.interface";
import { WebsocketData } from "../interfaces/websocket.data.interface";
import { Observable } from "rxjs/observable"
import { Store } from "@ngrx/store";
import { SETDEVICECODE, SETUCODE, SETSOCKETSTATE, SETAUTH, SETM} from "./../../store/socket.reducer";
import { AppState  } from "./../../store/store.interface";
let config: Config = require('./../config.json');
require( "nativescript-localstorage" );
var WS = require('nativescript-websockets');
@Injectable()
export class WebsocketService {
    private static _instance: WebsocketService;
    private socket: any;
    public reconnectCount: number = 0;
    public messages: Array<any> = [];
    public sendData:WebsocketData;
    private deviceCode: String;
    private randomLinkUcode: String;
    private reconnectTimer;
    private latitude:number = null;
    private longitude:number = null;
    private sendDataTimer;
    private sendDataCount: number = 0;
    constructor(private store:Store<AppState>) { //private zone: NgZone
        let self = this;
        if(WebsocketService._instance){
            throw new Error("Error: Instantiation failed: Use WebsocketService.Instance instead of new.");
        }
        this.store.dispatch({ type: SETDEVICECODE, payload: localStorage.getItem('device_code')});
        this.store.dispatch({ type: SETUCODE, payload: localStorage.getItem('random_link_ucode')});
        this.store.select(state => state.socket).subscribe(function (res) { 
            self.deviceCode = res.deviceCode;
            self.randomLinkUcode = res.randomLinkUcode;
            console.dir(res); 
        });
        // console.log('--------this.deviceCode???------', this.deviceCode);
        // this.connect();

        this.store.select(state => state.position).subscribe(function (res) { 
            console.log('---------------------state.position updated------------------------');
            console.dir(res);
            self.latitude = res.latitude;
            self.longitude = res.longitude;
        })
    }

    private connect() {
        var self=this;
        this.socket = new WS("ws://" + config.websocketUrl, {protocols: [/* 'chat', 'video' */], timeout: 6000, allowCellular: true, headers: { 'Authorization': 'Basic ...' }});
        this.socket.on('open', function(socket) { 
           // console.log("Hey I'm opened"); 
            // socket.send("Hello");
            self.store.dispatch({ type: SETSOCKETSTATE , payload: true});
            self.stopReconnect();
            self.vertification(); 
        });

        this.socket.on('message', function(socket, message) { 
           // console.log("Got a message");
           // console.log(message); 
            self.store.dispatch({ type: SETM, payload: message});
            let data = JSON.parse(message);
            if (data && data.command == 'AUTH') {
                if (data.message == "OK" || data.message == "DEVICE-OK") {
                    self.store.dispatch({ type: SETAUTH, payload: true});
                    self.startSendingPosition();
                }
                if (data.message == "DEVICE-OK") {
                    if (data.data) {
                        self.store.dispatch({ type: SETUCODE, payload: data.data.random_link_ucode});
                        self.store.dispatch({ type: SETUCODE, payload: data.data.random_link_ucode});
                        localStorage.setItem('random_link_ucode', data.data.random_link_ucode);
                    }
                }

            }
        });

        this.socket.on('close', function(socket, code, reason) { 
            //console.log("Socket was closed because: ", reason, " code: ", code); 
            //console.log("close----------------------");
            self.store.dispatch({ type: SETM, payload: "close----------------------"}); 
            self.store.dispatch({ type: SETM, payload: reason});
            self.store.dispatch({ type: SETSOCKETSTATE , payload: false});
            self.reconnect();    
            //console.log(self.reconnectCount);
            self.store.dispatch({ type: SETM, payload: "Socket was closed because: "+ reason});
        });
 
        this.socket.on('error', function(socket, error) { 
            //console.log("Socket had an error", error);
            self.store.dispatch({ type: SETM, payload: error});
        });
        this.socket.open();
    }

    private reconnect() { 
       // console.log(this.reconnectCount); 
       // console.log("reconnect----------------------"); 
        this.store.dispatch({ type: SETM, payload: "reconnect-----reconnectCount-----------------"});
        this.store.dispatch({ type: SETM, payload: this.reconnectCount});
        this.store.dispatch({ type: SETM, payload: "reconnect---------" + this.reconnectCount});
        var self=this;
        if (!this.reconnectCount) {
            this.reconnectTimer = setInterval(function(){ 
                //if (self.reconnectCount < 3) {
                    self.reconnectCount ++;
                    self.socket.open();
                //}
                // if (self.reconnectCount >= 3) {
                //     clearInterval(self.reconnectTimer);
                // }            
            }, 6000);
        }
    }

    public isSocketConnected() {
        if (this.socket.readyState) {
            return true;
        }
        return false;
    }

    public stopReconnect() { 
        //console.log(this.reconnectCount); 
        //console.log("stopReconnect----------------------"); 
        clearInterval(this.reconnectTimer);
        this.reconnectCount = 0;
    }

    public send(sendData) {
        this.socket.send(JSON.stringify(sendData));
    }

    public vertification() {
        //console.log('-----------vertification----------------------');
        let sendData = { 
            command: 'AUTH',
            send_to: 'ALL', 
            device_type: 'MOBILE_GPS', 
            device_code: this.deviceCode,// '100006',
            random_link_ucode: this.randomLinkUcode,//'8753f3ac-3b23-11e8-ab28-0242ac150002',
            message: '' 
        }
        this.send(sendData);
    }

    public sendPosition() {
        //console.log('-----------sendPosition----------------------');
        this.sendDataCount += 1 ;
        //let m = 'sendPosition count ' + this.sendDataCount;
        let m = this.sendDataCount;
       // console.log(m);
        this.store.dispatch({ type: SETM, payload: m});
        let sendData = { 
            command: 'MESSAGE',
            send_to: 'ALL', 
            device_type: 'MOBILE_GPS', 
            device_code: this.deviceCode,// '100006',
            random_link_ucode: this.randomLinkUcode,//'8753f3ac-3b23-11e8-ab28-0242ac150002',
            message: {
                position: {
                    latitude: this.latitude, 
                    longitude: this.longitude
                }, 
                name: 'Joe Car33'
            } 
        }
        this.send(sendData);
    }

    private startSendingPosition() {
        //let number = this.store.select(state => state.socket.latitude)
        if (!this.sendDataTimer) {
            let self = this;
            this.sendDataTimer = setInterval(function(){ 
                self.sendPosition();
            }, 5000);
        }
    }

    public static Instance(store: Store<AppState>)
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this(store));
    }
}