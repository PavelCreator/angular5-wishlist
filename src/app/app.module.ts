import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { DndModule }     from 'ng2-dnd';

import { AppRoutingModule }  from './routing/routing.module';

import { AppComponent }        from './app.component';
import { WishDetailComponent }      from './wish-detail/wish-detail.component';
import { WishListComponent }        from './wish-list/wish-list.component';
import { WishService }         from './services/wish.service';
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
    WishListComponent,
    WishDetailComponent
  ],
  providers: [
    WishService,
    LS,
    DataMockService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
