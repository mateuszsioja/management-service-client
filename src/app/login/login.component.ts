import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {Location} from "@angular/common";
import {AlertService} from "../_services/alert-service";


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private location: Location) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe((result) => {
          if (result === true) {
            document.body.innerHTML = '';
            window.location.replace('/home');
          } else {
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
        },
        error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      );
  }

  emptyLoginForm(): boolean {
    if (this.model.username && this.model.password) {
      return this.model.username.length > 1 && this.model.password.length > 1;
    }
    else return false;
  }

  goBack(): void {
    console.log("Back");
    this.location.back();
  }
}
