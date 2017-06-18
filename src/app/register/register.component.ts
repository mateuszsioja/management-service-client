import {Component, OnInit} from "@angular/core";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {EmailValidator} from "../_validators/email.validator";
import {Location} from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
  user = new User();
  userForm: FormGroup;
  uniqueUsernames: Set<string> = new Set<string>();
  uniqueEmails: Set<string> = new Set<string>();

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.createFrom();
    this.getUsersUniqueFields();
  }

  getUsersUniqueFields() {
    this.userService.getUniqueFields()
      .subscribe(usersUniqueFields => {
        this.uniqueUsernames = new Set<string>(usersUniqueFields.usernames);
        this.uniqueEmails = new Set<string>(usersUniqueFields.emails);
      });
  }

  usernameTaken(control: FormControl) {
    if (this.uniqueUsernames) {
      if (this.uniqueUsernames.has(control.value)) {
        return {usernameTaken: true};
      }
    }
    return null;
  }

  emailTaken(control: FormControl) {
    if (this.uniqueEmails) {
      if (this.uniqueEmails.has(control.value)) {
        return {emailTaken: true};
      }
    }
    return null;
  }

  createFrom(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        this.usernameTaken.bind(this)
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      email: ['', [
        Validators.required,
        EmailValidator.validate,
        this.emailTaken.bind(this)
      ]
      ]
    });

    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) return;
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'username': '',
    'password': '',
    'firstName': '',
    'lastName': '',
    'email': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required',
      'minlength': 'Username must be at least 2 characters long.',
      'maxlength': 'Username cannot be more than 25 characters long.',
      'usernameTaken': 'Username already exists'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be at least 2 characters long.'
    },
    'firstName': {
      'required': 'First Name is required',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastName': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'email': {
      'required': 'Email is required',
      'validateEmail': 'Please enter correct email.',
      'emailTaken': 'Email already exists'
    }
  };

  add(): void {
    console.log(this.userForm.value);
    if (this.userForm.status == 'VALID')
      this.userService.register(this.userForm.value)
        .subscribe(() => this.router.navigate(['/']));
  }

  goBack(): void {
    this.location.back();
  }
}
