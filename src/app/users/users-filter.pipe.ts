import {Pipe, PipeTransform} from "@angular/core";
import {UserOutput} from "../_models/user";

@Pipe({
  name: 'usersfilter',
  pure: false
})

export class UsersFilterPipe implements PipeTransform {

  transform(items: UserOutput[], filter: UserOutput): UserOutput[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: UserOutput) => this.applyFilter(item, filter));
  }

  applyFilter(user: UserOutput, filter: UserOutput): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (user[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (user[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
