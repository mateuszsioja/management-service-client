import {Injectable} from "@angular/core";
import {User, UserOutput, UsersUniqueFields} from "../_models/user";
import {Observable} from "rxjs";
import {ShortUser} from "../_models/short-user";
import {AuthHttp, JwtHelper} from "angular2-jwt";
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {PatchDto} from "../_models/patch-dto";

@Injectable()
export class UserService {

  jwtHelper: JwtHelper = new JwtHelper();
  private usersUrl = 'http://localhost:8080/api/users';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private authHttp: AuthHttp,
              private http: Http,
              private authService: AuthenticationService) {
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
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return this.authHttp.get(this.usersUrl).map(users => users.json());
    } else {
      return this.authService.refreshToken()
        .flatMap((isRefreshed: boolean) => {
          if (isRefreshed) {
            return this.authHttp.get(this.usersUrl).map(users => users.json());
          } else {
            return Observable.throw(new Error('Cant refresh the token'));
          }
        });
    }
  };

  getShortUsers(): Observable<ShortUser[]> {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return this.authHttp.get(this.usersUrl + '/short').map(users => users.json());
    } else {
      return this.authService.refreshToken()
        .flatMap((isRefreshed: boolean) => {
          if (isRefreshed) {
            return this.authHttp.get(this.usersUrl + '/short').map(users => users.json());
          } else {
            return Observable.throw(new Error('Cant refresh the token'));
          }
        });
    }
  }

  changeUserRole(userId: number, patchDto: PatchDto) {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return this.authHttp.patch(`${this.usersUrl}/${userId}`, JSON.stringify(patchDto));
    } else {
      return this.authService.refreshToken()
        .flatMap((isRefreshed: boolean) => {
          if (isRefreshed) {
            return this.authHttp.patch(`${this.usersUrl}/${userId}`, JSON.stringify(patchDto));
          } else {
            return Observable.throw(new Error('Cant refresh the token'));
          }
        });
    }
  }
}
