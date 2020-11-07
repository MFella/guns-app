import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'home'}},
  {path: 'login', component: AuthComponent, data: {animation: 'isLeft'}},
  {path: 'register', component: RegisterComponent, data: {animation: 'isRight'}},
  {path: 'profile', component: ProfileComponent, data: {animation: 'isLeft'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
