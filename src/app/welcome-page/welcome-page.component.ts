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

  /**
  * Called by a user observer.
  * Checks if there is a local user and navigates to the movies view if there is.
  * Only navigates if the router url equals /welcome.
  */
  tryAutoNavigateToMovies = (user:any) =>{
    if(user!==null && this.router.url === '/welcome'){
      this.router.navigate(['movies']);
    }
  }

  /**
  * Called on component initialization.
  * Supscribes to the user observabe.
  */
  ngOnInit(): void {
    this.userService.userObservable$.subscribe({
      next: (result:any) => this.tryAutoNavigateToMovies(result)
    });
  }

  /**
  * Opens the user registration dialog.
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
  * Opens the user login dialog.
  */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
