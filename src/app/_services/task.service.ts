import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Task} from "../_models/task";
import {PatchDto} from "../_models/patch-dto";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TaskService {

  private taskUrl = 'http://localhost:8080/api/tasks';

  constructor(private authHttp: AuthHttp) {}

  getTasks(): Observable<Task[]> {
    return this.authHttp.get(this.taskUrl)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error fetching data'));
  }

  deleteTask(id: number): Observable<any> {
    return this.authHttp.delete(`${this.taskUrl}/${id}`);
  }

  assignTaskToUser(taskId: number, patchDto: PatchDto) {
    return this.authHttp.patch(`${this.taskUrl}/${taskId}`, JSON.stringify(patchDto))
  }
}
