import {Component} from "@angular/core";
import {AuthenticationService} from "../../_services/authentication.service";
import {AuthenticationContextService} from "../../_services/authentication-context.service";
import {User} from "../../_models/user";

@Component({
  moduleId: module.id,
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})

export class HomeContentComponent {

  constructor(private authService: AuthenticationService,
              private authContextService: AuthenticationContextService) {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  hasAdminRole() {
    return this.authContextService.hasAdminRole();
  }

  hasUserRole() {
    return this.authContextService.hasUserRole();
  }

  loggedInUsername(): string {
    return this.authContextService.getUsernameOfCurrentlyLoggedUser();
  }
}
