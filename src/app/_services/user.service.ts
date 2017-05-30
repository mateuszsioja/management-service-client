import {Injectable} from "@angular/core";
import {User, UserOutput, UsersUniqueFields} from "../_models/user";
import {Observable} from "rxjs";
import {ShortUser} from "../_models/short-user";
import {AuthHttp} from "angular2-jwt";
import {Http, Headers} from "@angular/http";

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:8080/api/users';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private authHttp: AuthHttp,
              private http: Http) {
  }

  // Unauthorized

  register(user: User): Observable<User> {
    return this.http.post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
      .map(() => user);
  }

  getUniqueFields(): Observable<UsersUniqueFields> {
    return this.http.get(this.usersUrl + '/unique-fields')
      .map(fields => {
        return fields.json();
      });
  }

  // Authorized

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
}
