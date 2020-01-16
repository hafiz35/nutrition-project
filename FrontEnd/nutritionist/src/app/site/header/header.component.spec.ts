import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
export class MockAuthService{
  loggedInUser:BehaviorSubject<User>=new BehaviorSubject<User>({
    username:"string",
    password:"string",
    role:"string",
    email:"string",
    mobileNumber:"string",
    confirmed:true
  });
  logout(){

  }
}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ HeaderComponent ],
      providers:[HttpClient,
      {provide:AuthService, useClass:MockAuthService}
      //,{provide:Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('logout', () => {
    component.logout();
    expect(true).toBeTruthy();
   });

   
});
