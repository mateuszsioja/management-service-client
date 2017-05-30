import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
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
import {TaskService} from "./_services/task.service";
import {AuthenticationContextService} from "./_services/authentication-context.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TasksComponent} from "./tasks/tasks.component";
import {TaskAssignmentModal} from "./modal/assignment-modal/task-assignment-modal.component";
import {ToastyModule} from "ng2-toasty";
import {AlertService} from "./_services/alert-service";
import {UsersComponent} from "./users/users.component";
import {AuthModule} from "./auth.module";
import {UsersFilterPipe} from "./users/users-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    LoginComponent,
    RegisterComponent,
    TasksComponent,
    TaskAssignmentModal,
    UsersComponent,
    UsersFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ToastyModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    TaskService,
    AuthenticationContextService,
    AlertService,
  ],
  entryComponents: [TaskAssignmentModal],
  bootstrap: [AppComponent]
})
export class AppModule {
}

