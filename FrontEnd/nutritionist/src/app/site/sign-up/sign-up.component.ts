import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  baseUrl = environment.baseUrl;
  signUpError = false;
  signUpSuccess = false;
  signupForm = this.formBuilder.group({
    username: ['', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')],
      asyncValidators: [this.isUsernameTaken.bind(this)]
    }],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, this.matchConfirmPassword.bind(this)]]
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

  }
  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }
  get mobileNumber() {
    return this.signupForm.get('mobileNumber');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  isUsernameTaken(username: FormControl): Observable<any> {
    if (username.value.length >= 2) {
      return this.userService.userExists(username.value).pipe(map(value => value ? new Object({ usernameTaken: value }) : null));
    }
  }
  matchConfirmPassword(formControl: FormControl) {
    if (this.signupForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.password.value) {
        return ({ noMatch: true });
      }
    }
    return null;
  }
  onSignup() {
    const user: User = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      mobileNumber: this.mobileNumber.value,
    };
    this.userService.addUser(user).pipe(
      switchMap( newuser => this.authService.login(newuser.username, this.password.value))
    ).subscribe((res: HttpResponse<any>) => {
      this.authService.setToken(res.body.token);
      this.signUpSuccess = true;
    },
      () => {
        console.log('here');

        this.signUpError = true;
      },
      () => this.getUser());
  }
  getUser() {
    this.userService.getUser(this.username.value).subscribe(
      user => {
        this.authService.loggedInUser.next(user);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      });
  }
}