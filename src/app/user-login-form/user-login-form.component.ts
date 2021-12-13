import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router ){ }

  @Input() userData = { Username: '', Password: ''};

  ngOnInit(): void {
  }

  loginUser(): void {
    //define login success
    const onLoginSuccess = (result:any) => {

      /////store token on local storge -- all of this should be done in the service
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      this.userService.updateLocalUser(result.user.Username);
      /////

      const successMessage = "Login success. Welcome, " + result.user.Username;
      //close the modal
      this.dialogRef.close();
      //navigate to movies view
      this.router.navigate(['movies']);

      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
        });
    }
    //define login fail
    const onLoginFailed = (results:any) => {
      this.snackBar.open("An error occured.", 'OK', {
        duration: 4000
      });
    };

    //call subscribe
    this.userService.userLogin(this.userData.Username, this.userData.Password).subscribe({
      next: (result:any) => onLoginSuccess(result),
      error: (result:any) => onLoginFailed(result)
    });
  }
}
