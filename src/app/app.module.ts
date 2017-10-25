import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { DndModule }     from 'ng2-dnd';

import { AppRoutingModule }  from './routing/routing.module';

import { AppComponent }        from './app.component';

import { WishComponent }      from './wish/wish.component';
import { WishService }         from './wish/wish.service';

import { WishListComponent }        from './wish-list/wish-list.component';
import { WishListService }         from './wish-list/wish-list.service';

import { DataMockService } from "./api/data-mock.service";
import { LS } from './services/local-storage.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DndModule.forRoot()
  ],
  declarations: [
    AppComponent,
    WishComponent,
    WishListComponent
  ],
  providers: [
    LS,
    DataMockService,

    WishService,
    WishListService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
