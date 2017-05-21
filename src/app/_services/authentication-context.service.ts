import {Injectable} from "@angular/core";
import { JwtHelper } from 'angular2-jwt';
import {Role} from "../_models/role";

@Injectable()
export class AuthenticationContextService {

  private currentlyLoggedUserToken: string;
  jwtHelper: JwtHelper;

  constructor() {
    this.jwtHelper = new JwtHelper();
    this.currentlyLoggedUserToken = localStorage.getItem('token');
  }

  getUsernameOfCurrentlyLoggedUser() {
    const decodedToken = this.jwtHelper.decodeToken(this.currentlyLoggedUserToken);
    return decodedToken.username;
  }

  hasAdminRole() {
    return this.hasRole("ROLE_ADMIN");
  }

  hasUserRole() {
    return this.hasRole("ROLE_USER");
  }

  isAnonymous() {
   return this.getUserRoles().length > 0;
  }

  private hasRole(role: string) {
    for(let entry of this.getUserRoles()) {
      if (entry.authority == role) {
        return true;
      }
    }
    return false;
  }

  private getUserRoles() {
    const decodedToken = this.jwtHelper.decodeToken(this.currentlyLoggedUserToken);
    return decodedToken.roles;
  }
}
