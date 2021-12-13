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
    this.userService.userLogin(this.userData.Username, this.userData.Password).subscribe((result) => {

    //store token on local storge
    localStorage.setItem('token', result.token);
    const message = "Login success. Welcome, " + result.user.Username;
    this.dialogRef.close(); // This will close the modal on success!
    this.router.navigate(['movies']); //navigate to movies
    this.snackBar.open(message, 'OK', {
      duration: 4000
      });
    }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 4000
      });
    });
  }
}
