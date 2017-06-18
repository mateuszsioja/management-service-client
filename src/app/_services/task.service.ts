import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Task} from "../_models/task";
import {PatchDto} from "../_models/patch-dto";
import {AuthHttp, JwtHelper} from "angular2-jwt";
import {Http} from "@angular/http";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class TaskService {

  private taskUrl = 'http://localhost:8080/api/tasks';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp, private http: Http,
              private authService: AuthenticationService) {
  }

  // Unauthorized

  getTasks(): Observable<Task[]> {
    return this.http.get(this.taskUrl)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error fetching data'));
  }

  // Authorized

  deleteTask(id: number): Observable<any> {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return this.authHttp.delete(`${this.taskUrl}/${id}`);
    } else {
      return this.authService.refreshToken()
        .flatMap((isRefreshed: boolean) => {
          if (isRefreshed) {
            return this.authHttp.delete(`${this.taskUrl}/${id}`);
          } else {
            return Observable.throw(new Error('Cant refresh the token'));
          }
        });
    }
  }

  assignTaskToUser(taskId: number, patchDto: PatchDto) {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return this.authHttp.patch(`${this.taskUrl}/${taskId}`, JSON.stringify(patchDto));
    } else {
      return this.authService.refreshToken()
        .flatMap((isRefreshed: boolean) => {
          if (isRefreshed) {
            return this.authHttp.patch(`${this.taskUrl}/${taskId}`, JSON.stringify(patchDto));
          } else {
            return Observable.throw(new Error('Cant refresh the token'));
          }
        });
    }
  }

  addTask(task: Task): Observable<any> {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return this.authHttp.post(this.taskUrl, JSON.stringify(task));
    } else {
      return this.authService.refreshToken()
        .flatMap((isRefreshed: boolean) => {
          if (isRefreshed) {
            return this.authHttp.post(this.taskUrl, JSON.stringify(task));
          } else {
            return Observable.throw(new Error('Cant refresh the token'));
          }
        });
    }
  }
}
