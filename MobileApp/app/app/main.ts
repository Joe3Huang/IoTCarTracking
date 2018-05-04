import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";

declare module '@ngrx/store' {
    interface Action {
      type: string;
      payload?: any;
    }
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
