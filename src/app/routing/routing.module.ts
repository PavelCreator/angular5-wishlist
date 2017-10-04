import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WishListComponent }      from '../wish-list/wish-list.component';
import { WishDetailComponent}     from '../wish-detail/wish-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'detail/:id', component: WishDetailComponent },
  { path: 'list',     component: WishListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
