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
      const successMessage = "Login success. Welcome, " + result.user.Username;
      this.dialogRef.close();
      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
        });
    }
    //define login fail
    const onLoginFailed = (results:any) => {
      this.snackBar.open("Username or password is incorrect.", 'OK', {
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
