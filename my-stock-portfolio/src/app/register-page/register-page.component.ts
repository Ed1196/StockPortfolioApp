import { UserService } from './../shared/dbAccess/user.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user: UserModel;
  form: FormGroup;
  hide: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) 
    {
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
   * @post , form is built with child controls email, password, firstname, lastname. Validators for each 
   * AbstractControlOption are specified. These fields are connected to the HTML fields that have the same
   * formControlName as the child control
   * 
   * @return nothing
   *
   * @memberof RegisterPageComponent
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [this.user.email,          [Validators.required, Validators.email]],
      password: [this.user.password,    [Validators.required, Validators.minLength(6)]],
      firstname: [this.user.firstname,  [Validators.required]],  
      lastname: [this.user.lastname,    [Validators.required]]
    })
  }

  /**
   * @brief Function that will utilize UserService to register a user using the form provided. 
   * 
   * @pre All fields in the Angular Form have to be field in and in the correct format
   * @post userService will be called to make an http request to attempt to create a new user with the
   * credentials from the Angular Form. 
   * 
   * @return nothing
   */
  onSubmit(){
    this.user = Object.assign({}, this.form.value)
    
    this.userService.registerUser(this.user)
    .subscribe((data:any) => {
      console.log(data)
    });

  }

  login(){
    this.router.navigate(['/login'])
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

  /**
   *@author Edwin Quintuna
   *@brief Getter method. In a reactive form, you can always access any form control through the get method on its parent group
   *
   * @return value of the child control 'firstname'
   * 
   * @readonly
   * @memberof RegisterPageComponent
   */
  get firstname(){
    return this.form.get('firstname');
  }

  /**
   *@author Edwin Quintuna
   *@brief Getter method. In a reactive form, you can always access any form control through the get method on its parent group
   *
   * @return value of the child control 'lastname'
   * 
   * @readonly
   * @memberof RegisterPageComponent
   */
  get lastname(){
    return this.form.get('lastname');
  }

}
