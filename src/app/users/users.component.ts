import {Component, OnInit} from "@angular/core";
import {UserService} from "../_services/user.service";
import {UserOutput} from "../_models/user";
import {AlertService} from "../_services/alert-service";
import {AuthenticationContextService} from "../_services/authentication-context.service";
import {PatchDto} from "../_models/patch-dto";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserOutput[];
  filter: UserOutput = new UserOutput();

  constructor(private userService: UserService,
              private alertService: AlertService,
              private authContextService: AuthenticationContextService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(users => this.users = users,
        err => this.alertService.alertFailure('Could not get users list'));
  }

  loggedInUsername(): string {
    return this.authContextService.getUsernameOfCurrentlyLoggedUser();
  }

  changeRole(user: UserOutput) {
    let newRole: string;
    if (user.role === 'ROLE_USER') {
      newRole = 'ROLE_ADMIN';
    } else {
      newRole = 'ROLE_USER';
    }
    const patchDto = new PatchDto();
    patchDto.targetField = 'role';
    patchDto.value = newRole;
    this.userService.changeUserRole(user.id, patchDto)
      .subscribe(() => {
        this.alertService.alertSuccess('You have been successfully changed role');
        setTimeout(this.getUsers(), 200);
      });
  }
}
