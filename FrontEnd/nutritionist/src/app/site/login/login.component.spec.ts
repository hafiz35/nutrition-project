import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,HttpClientModule,RouterTestingModule],
      declarations: [ LoginComponent ],
      providers:[UserService,AuthService,HttpClient,
        //{provide:Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


it('invalid when form is empty', () => {
  expect(component.loginForm.valid).toBeFalsy();
});

it('username validity', () => {
  let username = component.loginForm.controls['username'];
  username.setValue('abc');
  expect(username.valid).toBeTruthy();
});

it('username validity when empty', () => {
  let username = component.loginForm.controls['username'];
  username.setValue('');
  expect(username.valid).toBeFalsy();
});


it('password validity', () => {
  let password = component.loginForm.controls['password'];
  password.setValue('pwd12345678');
  expect(password.valid).toBeTruthy();
});


it('password validity when empty', () => {
  let password = component.loginForm.controls['password'];
  password.setValue('');
  expect(password.valid).toBeFalsy();
});


it('get password when null', () => {
  let password = component.loginForm.controls['password'];
  password.setValue('');
  expect(component.password.value).toBe('');
});
it('get password with value', () => {
  let password = component.loginForm.controls['password'];
  password.setValue('pwd12345678');
  expect(component.password.value).toBe('pwd12345678');
});

it('get username when null', () => {
  let username = component.loginForm.controls['username'];
  username.setValue('');
  expect(component.username.value).toBe('');
});
it('get username with value', () => {
  let username = component.loginForm.controls['username'];
  username.setValue('abc');
  expect(component.username.value).toBe('abc');
});
});
