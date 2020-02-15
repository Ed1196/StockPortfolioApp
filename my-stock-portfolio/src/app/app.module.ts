import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './register-page/register-page.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { MatGridListModule, MatMenuModule, MatListModule, MatAutocompleteModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { StockSearchComponent } from './stock-search/stock-search.component';
import { StockPortfolioComponent } from './stock-portfolio/stock-portfolio.component';
import { StockTransactionsComponent } from './stock-transactions/stock-transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavBarComponent,
    RegisterPageComponent,
    HomePageComponent,
    MaterialDashboardComponent,
    StockSearchComponent,
    StockPortfolioComponent,
    StockTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    ReactiveFormsModule,

    //Angular Material
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatAutocompleteModule,
    
    //HTTP requests
    HttpClientModule,
    
    MatGridListModule,
    
    MatMenuModule,
    
    LayoutModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
