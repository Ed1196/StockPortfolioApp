import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://127.0.0.1:5000';
  user: UserModel;
  public authData = []
  
  constructor(private http:HttpClient) {
    this.user = new UserModel();
   }

  registerUser(user){

    //This request does not need a JWT token
    var reqHeader = new HttpHeaders({'No-Auth':'True'})

    //Adding Parameters to the request
    var requestedUrl= this.rootUrl + "/register"

    //Request body
    const body: UserModel = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password

    }
    return this.http.post(requestedUrl,body, {headers: reqHeader})
  }

  userAuthentication(user) {

    //This request does not need a JWT token
    var reqHeader = new HttpHeaders({'No-Auth':'True'})
    //Adding Parameters to the request
    var requestedUrl= this.rootUrl + "/login"
    //Request body
    const body: UserModel = {
      email: user.email,
      password: user.password

    }
    return this.http.post(requestedUrl,body, {headers: reqHeader})
  }

  refreshToken(refreshToken:string) {
    var reqHeader = new HttpHeaders({'No-Auth':'False'})
    var requestedUrl= this.rootUrl + "/refresh-token"
    const body = {
      refreshToken: refreshToken,

    }
    return this.http.post(requestedUrl,body, {headers: reqHeader})
  }

  getUserDetails(){

    //This request does not need a JWT token
    var reqHeader = new HttpHeaders({'No-Auth':'False'})
    //Adding Parameters to the request
    var requestedUrl= this.rootUrl + "/userinfo"
  
    return this.http.get(requestedUrl, {headers: reqHeader})
  }


}
