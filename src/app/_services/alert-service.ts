import {ToastyConfig, ToastyService} from "ng2-toasty";
import {Injectable} from "@angular/core";

@Injectable()
export class AlertService {

  constructor(private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'default';
  }

  alertSuccess(message) {
    this.toastyService.success({
      title: "Success",
      msg: message,
      showClose: true,
      timeout: 3000,
      theme: "default"
    });
  }

  alertFailure(message) {
    this.toastyService.error({
      title: "Error",
      msg: message,
      showClose: true,
      timeout: 4000,
      theme: "default"
    });
  }

}
