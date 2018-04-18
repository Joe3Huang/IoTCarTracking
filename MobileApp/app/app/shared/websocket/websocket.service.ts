import { Injectable, NgZone} from "@angular/core";
import { Config } from "../interfaces/config.interface";
import { WebsocketData } from "../interfaces/websocket.data.interface";
import { Observable } from "rxjs/observable"

let config: Config = require('./../config.json');
// require("nativescript-websockets");
require( "nativescript-localstorage" );
var WS = require('nativescript-websockets');
@Injectable()
export class WebsocketService{
    private static _instance: WebsocketService;
    private socket: any;
    public reconnectCount: number = 0;
    public messages: Array<any> = [];
    public sendData:WebsocketData;
    private deviceCode: String = localStorage.getItem('device_code');
    private randomLinkUcode: String = localStorage.getItem('random_link_ucode');
    private reconnectTimer;
    constructor() { //private zone: NgZone
        if(WebsocketService._instance){
            throw new Error("Error: Instantiation failed: Use WebsocketService.Instance instead of new.");
        }
        console.log("websockets----");
        this.connect();
    }

    private connect() {
        var self=this;
        this.socket = new WS("ws://" + config.websocketUrl, {protocols: [/* 'chat', 'video' */], timeout: 6000, allowCellular: true, headers: { 'Authorization': 'Basic ...' }});
        this.socket.on('open', function(socket) { 
            console.log("Hey I'm open"); socket.send("Hello");
            self.stopReconnect(); 
        });
        this.socket.on('message', function(socket, message) { 
            console.log("Got a message", message); 
        });

        this.socket.on('close', function(socket, code, reason) { 
            console.log("Socket was closed because: ", reason, " code: ", code); 
            console.log("close----------------------"); 
            self.reconnect();    
            console.log(self.reconnectCount);
        });
 
        this.socket.on('error', function(socket, error) { 
            console.log("Socket had an error", error);
        });
        this.socket.open();
    }

    private reconnect() { 
        console.log(this.reconnectCount); 
        console.log("reconnect----------------------"); 
        var self=this;
        if (!this.reconnectCount) {
            this.reconnectTimer = setInterval(function(){ 
                if (self.reconnectCount < 3) {
                    self.reconnectCount ++;
                    self.socket.open();
                }
                if (self.reconnectCount >= 3) {
                    clearInterval(self.reconnectTimer);
                }            
            }, 3000);
        }

         
    }

    public isSocketConnected() {
        if (this.socket.readyState) {
            return true;
        }
        return false;
    }

    public stopReconnect() { 
        console.log(this.reconnectCount); 
        console.log("stopReconnect----------------------"); 
        clearInterval(this.reconnectTimer);
        this.reconnectCount = 0;
    }

    public send(sendData) {
        // this.sendData.command= sendData.command;
        // this.sendData.send_to= sendData.send_to;
        // this.sendData.device_type= sendData.device_type;
        // this.sendData.device_code= sendData.device_code;
        // this.sendData.random_link_ucode= sendData.random_link_ucode;
        // this.sendData.message= sendData.message;
        this.socket.send(JSON.stringify(this.sendData));
    }

    public vertification() {
        console.log()
        let sendData = { 
            command: 'AUTH',
            send_to: 'ALL', 
            device_type: 'MOBILE_GPS', 
            device_code: this.deviceCode,// '100006',
            random_link_ucode: this.randomLinkUcode,//'8753f3ac-3b23-11e8-ab28-0242ac150002',
            message: '' 
        }
        this.socket.send(JSON.stringify(sendData));
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }
}