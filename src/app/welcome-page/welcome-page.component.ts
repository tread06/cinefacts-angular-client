import { UserService } from './../fetch-api-data.service';
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router, private userService:UserService) { }
  ngOnInit(): void {

    //check if the user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if(token && user){
      this.userService.updateLocalUser(user);
      this.router.navigate(['movies']); //navigate to movies
    }
  }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
