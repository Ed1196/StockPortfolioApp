import { UserService } from '../shared/dbAccess/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private service : UserService){}

  canActivate():  boolean {
    if ( localStorage.getItem('idToken') == null ){
      this.router.navigate(["/login"]) 
      return false;
    }
    else{    
     
      return true;
    } 
  }



}