import { Router } from '@angular/router';
import { Component, OnInit, HostListener} from '@angular/core';
import { UserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }

  user: any= null;
  screenWidth: any;

  /**
  * Called on component initialization.
  * Subscribes to the user observable.
  */
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    const userObserver = {
      next: (user: any) => this.user = user,
      error: (err: Error) => this.user = null,
    };
    this.userService.userObservable$.subscribe(userObserver);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
  }

  /**
  * Called when the logout button is clicked.
  * Calls logout in the user service and navigates to the welcome screen.
  */
  logout = () =>{
    this.userService.logout();
    this.router.navigate(['welcome']);
  }
}
