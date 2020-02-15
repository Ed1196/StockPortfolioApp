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
    //Token
    var idToken = ''
    //Request body
    const body: UserModel = {
      email: user.email,
      password: user.password

    }
    return this.http.post(requestedUrl,body, {headers: reqHeader})
    .subscribe((data : any)=>{
      
      if(data.success){
        //storing json object to localStorage
        localStorage.setItem('idToken', data.idToken);
        return true  
      }
      else{ 
         return false
    }; 
    });

  }


}
