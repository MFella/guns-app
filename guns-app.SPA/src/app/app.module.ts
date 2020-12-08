import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as $ from 'jquery';
import { SearchComponent } from './search/search.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { NgxIziToastModule } from 'ngx-izitoast';
import { AuthService } from './_services/auth.service';
import { AuthInterceptorInterceptor } from './_services/auth-interceptor.interceptor';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { MatSliderModule } from '@angular/material/slider';
import { SearchResolver } from './_resolvers/search.resolver';
import {JwPaginationModule} from 'jw-angular-pagination';
import { GunDetailComponent } from './gun-detail/gun-detail.component';
import { GunDetailResolver } from './_resolvers/gun-detail.resolver';
import { ShortPipe } from './_pipes/short.pipe';
import { CurrencyResolver } from './_resolvers/currency.resolver';
import { AppConfigService } from './_config/appconfig.service';
import { SearchItemComponent } from './search/search-item/search-item.component';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListResolver } from './_resolvers/order-list.resolver';
import { OrderComponent } from './order/order.component';
import { OrderResolver } from './_resolvers/order.resolver';
import { BasketComponent } from './basket/basket.component';
import { BasketResolver } from './_resolvers/basket.resolver';


export function appInit(confServ: AppConfigService){
  return  () => confServ.load().then(conf => {
    conf.rates.EUR = 1;

    localStorage.setItem('rates', JSON.stringify(conf.rates));
    //localStorage.setItem('currentRate', 'EUR');
    const firstStart = localStorage.getItem('currentRate');
    if(firstStart === null)
    {
      localStorage.setItem('currentRate', 'EUR');
    }

    
  });
}


@NgModule({
  declarations: [			
    AppComponent,
    NavComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent,
    SearchComponent,
    SearchItemComponent,
    FooterComponent,
    ProfileComponent,
    GunDetailComponent,
    ShortPipe,
      OrderListComponent,
      OrderComponent,
      BasketComponent
   ],
  imports: [
    MatSliderModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    NgxIziToastModule,
    CommonModule
   // JwPaginationModule
  ],
  providers: [
    FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    },
    SearchResolver,
    GunDetailResolver,
    CurrencyResolver,
    OrderListResolver,
    OrderResolver,
    BasketResolver,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [AppConfigService],
      multi: true
    }
  ],
  exports: [
    ShortPipe
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
