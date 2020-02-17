import { UserService } from './../shared/dbAccess/user.service';
import { UserModel, Stock } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userDetails: UserModel 
  

  constructor(private userService: UserService) { 
    this.userDetails = new UserModel;

  }

  ngOnInit() {
    
  }


}


