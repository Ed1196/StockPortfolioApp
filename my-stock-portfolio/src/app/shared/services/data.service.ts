import { UserModel } from 'src/app/shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject<UserModel>(new UserModel());
  currentData = this.dataSource.asObservable();

  constructor() { }

  updateData(userDetails: UserModel){
    this.dataSource.next(userDetails)
  }
}
