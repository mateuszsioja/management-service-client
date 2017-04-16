import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing.module";
import {AuthenticationService} from "./_services/authentication.service";
import {AuthGuard} from "./_guards/auth.guard";
import {HomeComponent} from "./home/home.component";
import {TaskComponent} from "./task/task.component";
import {LoginComponent} from "./login/login.component";
import {UserService} from "./_services/user.service";
import {RegisterComponent} from "./register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

