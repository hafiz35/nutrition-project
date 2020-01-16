import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: User = null;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedInUser.subscribe(user => this.loggedInUser = user);
    
  }

  logout() {
    this.authService.logout();
  }

  home() {
      this.router.navigate(["/"]);
}
}
