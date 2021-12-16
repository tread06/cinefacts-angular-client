import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css']
})
export class UserUpdateFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  user:any = null;

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const userObserver = {
      next: (user: any) => this.userDataUpdated(user),
      error: (err: Error) => this.user = null,
    };
    this.userService.userObservable$.subscribe(userObserver);
  }
  userDataUpdated(user:any){
    this.user=user;
    this.userData.Email=user.Email;
    this.userData.Birthday=user.Birthday;
  }

  updateUser(): void {

    //define login success
    const onUpdateSuccess = (result:any) => {
      this.dialogRef.close();
      this.snackBar.open("User update success.", 'OK', {
        duration: 4000
      });
    }
    //define login fail
    const onUpdateFailed = (results:any) => {
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

  this.userService.updateUser(this.user.Username,{
    Username: this.user.Username,
    Password: this.userData.Password,
    Email: this.userData.Email,
    Birthday: stringDate
  }).subscribe({
    next: (result:any) => onUpdateSuccess(result),
    error: (result:any) => onUpdateFailed(result)
  });
  }
}
