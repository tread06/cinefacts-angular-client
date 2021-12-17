import { Component, OnInit } from '@angular/core';
import { UserService } from './fetch-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cineFacts-Angular-client';

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.checkLocalStoarge();
    console.log("Hello there.");
  }
}
