import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule, ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';
import { counterReducer } from "./store/counter.reducer";
import { socketReducer } from "./store/socket.reducer";
import { userReducer } from "./store/user.reducer";
import { routes, navigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";
import { AppState } from "./store/store.interface";
import { NativescriptBottomNavigationModule} from "nativescript-bottom-navigation/angular";
 
const reducers = {
  counter: counterReducer,
  socket: socketReducer,
  user: userReducer
};

@NgModule({
  imports: [
    NativeScriptModule,
    // NativeScriptDevToolsMonitors,
    NativescriptBottomNavigationModule,
    StoreModule.forRoot(reducers),
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
