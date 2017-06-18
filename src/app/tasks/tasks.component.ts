import {Task} from "../_models/task";
import {TaskService} from "../_services/task.service";
import {AuthenticationContextService} from "../_services/authentication-context.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Component, OnInit} from "@angular/core";
import {TaskAssignmentModal} from "../modal/assignment-modal/task-assignment-modal.component";
import {AlertService} from "../_services/alert-service";
import {AddTaskModalComponent} from "../modal/add-task-modal/add-task-modal.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService,
              private authenticationContext: AuthenticationContextService,
              private modalService: NgbModal,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getTasks();
    this.authenticationContext.hasAdminRole();
  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(
        tasks => {
          this.tasks = tasks;
          this.tasks.sort((a, b) => {
            return a.id < b.id ? -1 : 1;
          });
        },
        err => {
          console.log(err);
          this.alertService.alertFailure('Could not get task list');
        });
  }

  deleteTask(id: number) {
    this.taskService
      .deleteTask(id)
      .subscribe(
        result => {
          this.getTasks();
          this.alertService.alertSuccess('Task was successfully deleted');
        },
        error => {
          console.log(error);
          this.alertService.alertFailure('Task could not be deleted');
        }
      );
  }

  displayIconDependingOnTheRole(): string {
    if (this.authenticationContext.hasAdminRole()) {
      return 'inline';
    }
    return 'none';
  }

  displayIconForAuthenticated(): string {
    if (this.authenticationContext.hasAdminOrUserRole()) {
      return 'inline';
    }
    return 'none';
  }

  hasAnyRole(): boolean {
    return this.authenticationContext.hasAdminOrUserRole();
  }

  openAssignmentModal(task: Task): void {
    const modalRef = this.modalService.open(TaskAssignmentModal);
    modalRef.componentInstance.task = task;
    modalRef.result.then(() => {
      setTimeout(() => this.getTasks(), 200);
    });
  }

  addTaskOpenModal(): void {
    const modalRef = this.modalService.open(AddTaskModalComponent);
    modalRef.result.then(() => {
      setTimeout(() => this.getTasks(), 200);
    });
  }
}


