/**
 * Created by Mateusz on 2017-06-15.
 */

import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationContextService} from "../_services/authentication-context.service";
import {AlertService} from "../_services/alert-service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authContext: AuthenticationContextService,
  private alertService: AlertService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authContext.hasAdminRole()) {
      return true;
    }
    // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    this.router.navigate(['/home']);
    this.alertService.alertFailure('You dont have access to this page!');
    return false;
  }
}
