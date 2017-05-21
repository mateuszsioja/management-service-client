import {Injectable} from "@angular/core";
import {User, UserOutput, UsersUniqueFields} from "../_models/user";
import {Observable} from "rxjs";
import {ShortUser} from "../_models/short-user";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:8080/api/users';

  constructor(private authHttp: AuthHttp) {}

  register(user: User): Observable<User> {
    return this.authHttp.post(this.usersUrl, JSON.stringify(user))
      .map(() => user);
  }

  getAll(): Observable<UserOutput[]> {
    return this.authHttp.get(this.usersUrl)
      .map(users => {
        return users.json();
      });
  };

  getShortUsers(): Observable<ShortUser[]> {
    return this.authHttp.get(this.usersUrl + '/short')
      .map(users => {
        return users.json();
      });
  }

  getUniqueFields(): Observable<UsersUniqueFields> {
    return this.authHttp.get(this.usersUrl + '/unique-fields')
      .map(fields => {
        return fields.json();
      });
  }
}
