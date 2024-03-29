import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apane-migrante-app';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(){
    this.userService.autoAuthUser();
  }
  
}
