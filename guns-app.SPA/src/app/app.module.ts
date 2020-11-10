import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

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

@NgModule({
  declarations: [			
    AppComponent,
    NavComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent,
    SearchComponent,
      FooterComponent,
      ProfileComponent,
      GunDetailComponent
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
    NgxIziToastModule
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
    GunDetailResolver
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
