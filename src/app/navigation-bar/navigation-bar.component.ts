import { Component, OnInit} from '@angular/core';
import { UserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private userService : UserService) { }

  user = "username";

  ngOnInit(): void {

    const userObserver = {
      next: (username: string) => this.user = username,
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.userService.userObservable$.subscribe(userObserver);
  }
}
