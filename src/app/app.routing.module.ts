import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {TasksComponent} from "./tasks/tasks.component";
import {UsersComponent} from "./users/users.component";
import {AdminGuard} from "./_guards/admin.guard";
import {HomeContentComponent} from "./home/content/home-content.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', component: HomeContentComponent},
      { path: 'tasks', component: TasksComponent },
      { path: 'users', component: UsersComponent, canActivate: [AdminGuard] }
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

