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

  ngOnInit(): void {
    
  }

  //to do use non-depricated subscribe
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

  this.userService.userRegistration(this.userData).subscribe({
    next: (result:any) => onRegisterSuccess(result),
    error: (result:any) => onRegisterFailed(result)
  });
  }
}
