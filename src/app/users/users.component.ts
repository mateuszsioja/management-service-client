import {Component, OnInit} from "@angular/core";
import {UserService} from "../_services/user.service";
import {UserOutput} from "../_models/user";
import {AlertService} from "../_services/alert-service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserOutput[];
  filter: UserOutput = new UserOutput();

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(users => this.users = users,
        err => this.alertService.alertFailure('Could not get users list'));
  }
}
