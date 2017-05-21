import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Task} from "../../_models/task";
import {UserService} from "../../_services/user.service";
import {ShortUser} from "../../_models/short-user";
import {AuthenticationContextService} from "../../_services/authentication-context.service";
import {TaskService} from "../../_services/task.service";
import {PatchDto} from "../../_models/patch-dto";
import {AlertService} from "../../_services/alert-service";


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './task-assignment-modal.component.html',
  styleUrls: ['./task-assignment-modal.component.css']
})
export class TaskAssignmentModal implements OnInit {

  @Input() task: Task;
  users: ShortUser[];
  selectedUser: ShortUser;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService,
              private taskService: TaskService,
              private authenticationContext: AuthenticationContextService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.userService
      .getShortUsers()
      .subscribe(result => this.users = result);
  }

  assignMyself() {
    this.selectedUser = this.users
      .find(user => user.username == this.authenticationContext.getUsernameOfCurrentlyLoggedUser());
  }

  assignUserToTask() {
    let patchDto = new PatchDto();
    patchDto.targetField = 'id';
    patchDto.value = this.selectedUser.id.toString();
    this.taskService.assignTaskToUser(this.task.id, patchDto)
      .subscribe(() => {
        this.alertService.alertSuccess('Task was successfully assigned')
        window.location.reload();
      });
    this.activeModal.close();
  }
}
