import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User, UserOutput, UsersUniqueFields} from "../_models/user";
import {Observable} from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:8080/api/users';

  register(user: User): Observable<User> {
    return this.http.post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
      .map(() => user);
  }

  getAll(): Observable<UserOutput[]> {
    return this.http.get(this.usersUrl)
      .map(users => {
        return users.json();
      });
  }

  getUniqueFields(): Observable<UsersUniqueFields> {
    return this.http.get(this.usersUrl + '/unique-fields')
      .map(fields => {
        return fields.json();
      });
  }
}
