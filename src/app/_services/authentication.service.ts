import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  private authUrl = 'http://localhost:8080/api/auth';

  login(username: string, password: string): Observable<void> {
    return this.http.post(this.authUrl,
      JSON.stringify({ username: username, password: password }),
      {headers: this.headers})
      .map((response: Response) => {
        let token = response.json().token;
        if (token) {
          localStorage.setItem('token', token);
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
}
