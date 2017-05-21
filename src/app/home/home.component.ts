import {Component} from "@angular/core";
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert-service";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private alertService: AlertService) {}

  //jwtHelper: JwtHelper = new JwtHelper();

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  addToast() {
    this.alertService.alertFailure('xd')
  }
}
