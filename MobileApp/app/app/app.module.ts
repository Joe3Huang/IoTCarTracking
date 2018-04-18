import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";

// import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from "./reducers/counter.reducer";

import { routes, navigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";
@NgModule({
  imports: [
    NativeScriptModule,
    // NativeScriptDevToolsMonitors,
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument(),
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],  
  declarations: [AppComponent, navigatableComponents],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
