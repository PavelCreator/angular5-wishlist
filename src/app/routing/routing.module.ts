import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../auth/login.component';
import { RegistrationComponent } from '../auth/registration.component';

import { WishComponent } from '../wish/wish.component';
import { WishListComponent } from '../wish-list/wish-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'detail/:id', component: WishComponent},
  {path: 'list', component: WishListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
