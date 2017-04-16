import {Task} from './task';

export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export class UserOutput extends User {
  id: number;
  role: string;
  taskDtos: Task[];
}

export class UsersUniqueFields {
  usernames: any;
  emails: any;
}
