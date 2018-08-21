import { Injectable, NgZone} from "@angular/core";
var Sqlite = require( "nativescript-sqlite" );

@Injectable()
export class SqliteService {
    private database: any;
    public people: Array<any>;

    public constructor() {
        this.people = [];
        (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY AUTOINCREMENT, device_code TEXT, random_link_ucode TEXT)").then(id => {
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public insert() {
        this.database.execSQL("INSERT INTO config (device_code, random_link_ucode) VALUES (?, ?)", ["Nic", "Raboy"]).then(id => {
            console.log("INSERT RESULT", id);
            this.fetch();
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    public fetch() {
        this.database.all("SELECT * FROM config").then(rows => {
            this.people = [];
            for(var row in rows) {
                this.people.push({
                    "device_code": rows[row][1],
                    "random_link_ucode": rows[row][2]
                });
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
}
