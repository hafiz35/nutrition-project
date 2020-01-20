import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
      declarations: [SignUpComponent],
      providers:[UserService,AuthService,HttpClient,
      {provide:Router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //component.ngOnInit();
  });



  it('invalid when form is empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });


  it('username validity when empty', () => {
    let username = component.signupForm.controls['username'];
    username.setValue('');
    expect(username.valid).toBeFalsy();
  });

  it('password validity', () => {
    let password = component.signupForm.controls['password'];
    password.setValue('pwd12345678');
    expect(password.valid).toBeTruthy();
  });
  it('password validity', () => {
    let password = component.signupForm.controls['password'];
    password.setValue('pwd12');
    expect(password.valid).toBeFalsy();
  });

  it('password validity when empty', () => {
    let confirmPassword = component.signupForm.controls['confirmPassword'];
    confirmPassword.setValue('');
    expect(confirmPassword.valid).toBeFalsy();
  });

  it('confirm password validity when empty', () => {
    let password = component.signupForm.controls['password'];
    password.setValue('');
    expect(password.valid).toBeFalsy();
  });
  it('email validity when empty', () => {
    let email = component.signupForm.controls['email'];
    email.setValue('');
    expect(email.valid).toBeFalsy();
  });

  it('email validity', () => {
    let email = component.signupForm.controls['email'];
    email.setValue('abc@gmail.com');
    expect(email.valid).toBeTruthy();
  });


  it('mobile validity when empty', () => {
    let mobile = component.signupForm.controls['mobileNumber'];
    mobile.setValue('');
    expect(mobile.valid).toBeFalsy();
  });

  it('mobile validity', () => {
    let mobile = component.signupForm.controls['mobileNumber'];
    mobile.setValue('9473373723');
    expect(mobile.valid).toBeTruthy();
  });

 it('get username validity', () => {
    let username = component.signupForm.controls['username'];
    username.setValue('abc');
    expect(component.username.value).toBe('abc');
  });


  it('get username validity when empty', () => {
    let username = component.signupForm.controls['username'];
    username.setValue('');
    expect(component.username.value).toBe('');
  });

  it('get password validity', () => {
    let password = component.signupForm.controls['password'];
    password.setValue('pwd12345678');
    expect(component.password.value).toBe('pwd12345678');
  });


  it('get password validity when empty', () => {
    let password = component.signupForm.controls['password'];
    password.setValue('');
    expect(component.password.value).toBe('');
  });


  it('get email validity when empty', () => {
    let email = component.signupForm.controls['email'];
    email.setValue('');
    expect(component.email.value).toBe('');
  });

  it('get email validity', () => {
    let email = component.signupForm.controls['email'];
    email.setValue('abc@gmail.com');
    expect(component.email.value).toBe('abc@gmail.com');
  });


  it('get mobile validity when empty', () => {
    let mobile = component.signupForm.controls['mobileNumber'];
    mobile.setValue('');
    expect(component.mobileNumber.value).toBe('');
  });

  it('get mobile validity', () => {
    let mobile = component.signupForm.controls['mobileNumber'];
    mobile.setValue('9473373723');
    expect(component.mobileNumber.value).toBe('9473373723');
  });

  it('get confirm password validity when empty', () => {
    let confirmPassword = component.signupForm.controls['confirmPassword'];
    confirmPassword.setValue('');
    expect(component.confirmPassword.value).toBe('');
  });
});
