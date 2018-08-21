import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { socketReducer } from "./store/socket.reducer";
import { positionReducer } from "./store/position.reducer";

// import { routes, navigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";
import { AppState } from "./store/store.interface";

const reducers = {
  socket: socketReducer,
  position: positionReducer
};

// @NgModule({
//   imports: [
//     NativeScriptModule,
//     StoreModule.forRoot(reducers),
//     StoreDevtoolsModule.instrument(),
//     NativeScriptFormsModule,
//     NativeScriptHttpModule,
//     NativeScriptRouterModule,
//     NativeScriptRouterModule.forRoot(routes)
//   ],  
//   declarations: [AppComponent, navigatableComponents],
//   bootstrap: [AppComponent],
//   schemas: [NO_ERRORS_SCHEMA],
// })
@NgModule({
  imports: [
    NativeScriptModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    NativeScriptFormsModule,
    NativeScriptHttpModule,
  ],  
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
