import { LoginComponent } from "./pages/login/login.component";
import { MainComponent } from "./pages/main/main.component";

export const routes = [
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent }
];

export const navigatableComponents = [
  LoginComponent,
  MainComponent
];