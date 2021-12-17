import { UserUpdateFormComponent } from './../user-update-form/user-update-form.component';
import { UserService } from './../fetch-api-data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user:any = null;
  constructor(private userService: UserService, private dialog: MatDialog) { }

  /**
  * Called on component initialization.
  * subscribes to the user observable.
  */
  ngOnInit(): void {

    const userUpdated = (user:any):void =>{
      this.user=user;
    }

    const userObserver = {
      next: (user: any) => userUpdated(user),
      error: (err: Error) => this.user = null,
    };
    this.userService.userObservable$.subscribe(userObserver);
  }

  /**
  * Called when the update button is clicked.
  * Opens the user update dialog.
  */
  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px'
    });
  }
}
