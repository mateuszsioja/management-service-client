import {Component} from "@angular/core";
import {JwtHelper} from 'angular2-jwt';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private authService: AuthenticationService,
              private router: Router) {}

  //jwtHelper: JwtHelper = new JwtHelper();

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
