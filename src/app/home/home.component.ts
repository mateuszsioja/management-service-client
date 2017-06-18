import {Component} from "@angular/core";
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert-service";
import {AuthenticationContextService} from "../_services/authentication-context.service";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private alertService: AlertService,
              private authenticationContextService: AuthenticationContextService) {
  }

  //jwtHelper: JwtHelper = new JwtHelper();

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    document.body.innerHTML = '';
    location.replace('/');
  }

  addToast() {
    this.alertService.alertFailure('xd');
  }

  displayIfHasAdminRole(): boolean {
    return this.authenticationContextService.hasAdminRole();
  }
}
