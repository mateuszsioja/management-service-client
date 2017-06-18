import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShortUser} from "../../_models/short-user";
import {UserService} from "../../_services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../_services/task.service";
import {AlertService} from "../../_services/alert-service";
import {AuthenticationContextService} from "../../_services/authentication-context.service";
import {Task} from "../../_models/task";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css']
})
export class AddTaskModalComponent implements OnInit {
  users: ShortUser[];
  selectedUser: ShortUser;
  taskForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService,
              private taskService: TaskService,
              private authenticationContext: AuthenticationContextService,
              private alertService: AlertService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getShortUsers();
    this.createForm();
  }

  getShortUsers(): void {
    this.userService
      .getShortUsers()
      .subscribe(users => this.users = users);
  }

  createForm() {
    this.taskForm = this.fb.group({
      type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      summary: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      priority: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      status: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      user: ''
    });
  }

  addTask(): void {
    let task: Task;
    task = this.taskForm.value;
    if (this.taskForm.value.user) {
      task.userId = this.taskForm.value.user.id;
    }
    this.taskService.addTask(task)
      .subscribe(() => {
        this.alertService.alertSuccess('Task was successfully added');
      });
    this.activeModal.close();
  }

  assignMyself(): void {
    this.selectedUser = this.users
      .find(user => user.username === this.authenticationContext.getUsernameOfCurrentlyLoggedUser());
  }
}
