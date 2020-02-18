import { UserService } from './../shared/dbAccess/user.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: UserModel;
  form: FormGroup;
  hide: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { 

    this.user = new UserModel();
    this.hide = true;

  }

  /**
   *
   * @brief Function that will be called once Angular has finished initializing and setting up the 
   * component. This function is async as we need to wait for data to be retrieved before setting values 
   * or doing logic
   * 
   * @pre  , form is not built
   * @post , form is built with child controls email, password. Validators for each 
   * AbstractControlOption are specified. These fields are connected to the HTML fields that have the same
   * formControlName as the child control
   * 
   * @return nothing
   *
   * @memberof RegisterPageComponent
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    })
  }

  
  onSubmit(){
    this.user = Object.assign({}, this.form.value);

    this.userService.userAuthentication(this.user).subscribe((data : any)=>{
      
      if(data.success){
        //storing json object to localStorage
        localStorage.setItem('idToken', data.idToken);
        this.router.navigate(['/']) 
      }
      else{ 
        this.router.navigate(['/login'])
    }; 
    });

  }

  /**
   *@author Edwin Quintuna
   *@brief Getter method. In a reactive form, you can always access any form control through the get method on its parent group
   *
   * @return value of the child control 'email'
   * 
   * @readonly
   * @memberof RegisterPageComponent
   */

  register(){
    this.router.navigate(['/register'])
  }

  
  get email(){
    return this.form.get('email');
  }

 /**
   *@author Edwin Quintuna
   *@brief Getter method. In a reactive form, you can always access any form control through the get method on its parent group
   *
   * @return value of the child control 'password'
   * 
   * @readonly
   * @memberof RegisterPageComponent
   */
  get password(){
    return this.form.get('password');
  }

}
