import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WishComponent } from '../wish/wish.component';
import { WishListComponent } from '../wish-list/wish-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'detail/:id', component: WishComponent},
  {path: 'list', component: WishListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
