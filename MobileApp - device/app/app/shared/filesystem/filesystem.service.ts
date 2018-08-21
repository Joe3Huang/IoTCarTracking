import { Injectable, NgZone} from "@angular/core";
// import { Observable } from "rxjs/observable"
import { Store } from "@ngrx/store";
import { AppState  } from "./../../store/store.interface";
import { SETM } from "./../../store/socket.reducer";
// import { knownFolders, File, Folder } from "file-system";
// import * as fs from "tns-core-modules/file-system";
// import android from "";

@Injectable()
export class FilesystemService {
    folder = null;
    file = null;
    fileTextContent = null;
    folderName = null;
    fileName = null;
    successMessage = null;
    writtenContent = null;
    isItemVisible = null;
    constructor(private store:Store<AppState>) { 
        //let documents = knownFolders.documents();
    //     let externalPath= fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOCUMENTS).toString());
    //     this.folder = fs.Folder.fromPath(externalPath+"/testFolder");
    //    // this.folder = documents.getFolder(this.folderName || "testFolder");
    //     this.file = this.folder.getFile((this.fileName || "testFile") + ".txt");
    //     this.file.writeText(this.fileTextContent || "some random content")
    //     .then(result => {
    //         this.file.readText()
    //             .then(res => {
    //                 this.successMessage = "Successfully saved in " + this.file.path;
    //                 this.writtenContent = res;
    //                 this.isItemVisible = true;
    //                 let m = this.successMessage + '---' + this.writtenContent;
    //                 this.store.dispatch({ type: SETM, payload: m});
    //             });
    //     }).catch(err => {
    //         console.log(err);
    //     });
    }
}