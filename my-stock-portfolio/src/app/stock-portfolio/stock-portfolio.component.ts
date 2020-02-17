import { UserService } from './../shared/dbAccess/user.service';
import { Stock } from './../shared/models/user.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'app-stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styleUrls: ['./stock-portfolio.component.css']
})
export class StockPortfolioComponent implements OnInit {
  @Input() card: any;
  @Input() userDetails: UserModel;
  total: number;


  constructor(private userService: UserService) {
    this.userDetails = new UserModel()
    this.total = 0
  }

  ngOnInit() {
    for(let stock of this.userDetails.stocks){
      this.total = (stock.quantity * stock.price) + this.total
    }
  }

  get_total() {
    
  }

  
  

}
