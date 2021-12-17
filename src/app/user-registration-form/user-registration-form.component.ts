import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  /**
  * Called when the register button is clicked.
  * Prepares form data for registration and calls registerUser on the user service.
  */
  registerUser(): void {

    //define login success
  const onRegisterSuccess = (result:any) => {
    this.dialogRef.close();
    this.snackBar.open("Registration success. Welcome, " + result.Username, 'OK', {
      duration: 4000
      });
  }
  //define login fail
  const onRegisterFailed = (results:any) => {
    this.snackBar.open("An error occured.", 'OK', {
      duration: 4000
    });
  };

  //convert date to YYYY-MM-DD
  const date = new Date(this.userData.Birthday);
  const newdate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds());

  const stringDate = newdate.toISOString();

  this.userService.userRegistration({
    Username: this.userData.Username,
    Password: this.userData.Password,
    Email: this.userData.Email,
    Birthday: stringDate
  }).subscribe({
    next: (result:any) => onRegisterSuccess(result),
    error: (result:any) => onRegisterFailed(result)
  });
  }
}
