import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }  from './routing/routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './api/in-memory-data.service';

import { AppComponent }        from './app.component';
import { WishDetailComponent }      from './wish-detail/wish-detail.component';
import { WishListComponent }        from './wish-list/wish-list.component';
import { WishService }         from './services/wish.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WishListComponent,
    WishDetailComponent
  ],
  providers: [
    WishService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
