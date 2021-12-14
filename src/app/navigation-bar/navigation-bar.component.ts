import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { UserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }

  user: any= null;

  ngOnInit(): void {
    const userObserver = {
      next: (user: any) => this.user = user,
      error: (err: Error) => this.user = null,
    };
    this.userService.userObservable$.subscribe(userObserver);
  }

  logout = () =>{
    this.userService.logout();
    this.router.navigate(['welcome']);
  }
}
