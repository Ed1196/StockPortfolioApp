import { Router } from '@angular/router';
import { UserService } from './../shared/dbAccess/user.service';
import { UserModel, Stock } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userDetails: UserModel 
  

  constructor(
    private service: UserService,
    private router: Router) { 
    this.userDetails = new UserModel;

    interval(3*6000).subscribe ( x => {
      this.refreshToken()
    })

  }

  ngOnInit() {
    this.refreshToken()
  }

  refreshToken() {

    let refreshToken = localStorage.getItem('refreshToken')
    this.service.refreshToken(refreshToken).subscribe(data => {

      if (data['success']){
        
        localStorage.setItem('idToken', data['idToken']);
        localStorage.setItem('refreshToken', data['refreshToken']);
        this.router.navigate(["/home"])
        
      } else {
        localStorage.removeItem('idToken')
        localStorage.removeItem('refreshToken')
        this.router.navigate(["/login"]) 
      }
       
    })
  }
 


}


