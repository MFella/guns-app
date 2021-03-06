import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BasketComponent } from './basket/basket.component';
import { GunDetailComponent } from './gun-detail/gun-detail.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './_guards/auth.guard';
import { BasketResolver } from './_resolvers/basket.resolver';
import { CurrencyResolver } from './_resolvers/currency.resolver';
import { GunDetailResolver } from './_resolvers/gun-detail.resolver';
import { OrderListResolver } from './_resolvers/order-list.resolver';
import { OrderResolver } from './_resolvers/order.resolver';
import { SearchResolver } from './_resolvers/search.resolver';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'home'}},
  {path: 'login', component: AuthComponent, data: {animation: 'isLeft'}},
  {path: 'register', component: RegisterComponent, data: {animation: 'isRight'}},
  {path: 'search', component: SearchComponent, data: {animation: 'isRight'}, resolve:{
    gun: SearchResolver //, rates: CurrencyResolver
  }},
  {path: 'search/:name', component: GunDetailComponent, data: {animation: 'isLeft'}, resolve: {
    gun: GunDetailResolver
  }},
  {path: 'profile', component: ProfileComponent, data: {animation: 'isLeft'},  canActivate: [AuthGuard]},
  {path: 'order-list', component: OrderListComponent, data:{animation: 'isLeft'}, resolve: { orders: OrderListResolver},
   canActivate: [AuthGuard], 
  //  children: [
  //    {path: ':id', component: ProfileComponent, data: {animation: 'isLeft'}}
  //  ]
  },
    {path:'order-list/:id', component: OrderComponent, canActivate: [AuthGuard], resolve: {order: OrderResolver}},
    {path: 'basket', component: BasketComponent, canActivate: [AuthGuard], resolve: {basket: BasketResolver}},
    {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
