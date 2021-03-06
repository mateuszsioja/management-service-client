import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthenticationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<boolean> {
    this.logout();
    return this.http.post(this.authUrl,
      JSON.stringify({username: username, password: password}),
      {headers: this.headers})
      .map((response: Response) => {
        const token = response.json().token;
        if (token) {
          localStorage.setItem('token', token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  loggedIn() {
    if (localStorage.getItem('token')) {
      return tokenNotExpired();
    }
    return false;
  }

  refreshToken(): Observable<boolean> {
    const url = this.authUrl + '/refresh';
    return this.http.post(url, JSON.stringify(localStorage.getItem('token')),
      {headers: this.headers})
      .map((response: Response) => {
        const token = response.json().token;
        if (token) {
          localStorage.setItem('token', token);
          return true;
        } else {
          return false;
        }
      });
  }
}
