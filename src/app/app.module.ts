import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DndModule } from 'ng2-dnd';
// import { ClickOutside } from './directives/click-outside.directive';

import { AppRoutingModule} from './routing/routing.module';

import { HideDonePipe } from './pipes/hide-done.pipe';

import { AppComponent} from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';

import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthService } from './auth/auth.service';

import { WishComponent } from './wish/wish.component';
import { WishService } from './wish/wish.service';

import { WishListComponent } from './wish-list/wish-list.component';
import { WishListService } from './wish-list/wish-list.service';

import { BaseWishListService } from './wish-list/base-wish-list.service';
import { ApiService } from './api/api.service';
import { LS } from './services/local-storage.service';
import { CustomValidationService } from './services/custom-validation.service';
import { WishInListService } from './wish-in-list/wish-in-list.service';
import { WishInListComponent } from './wish-in-list/wish-in-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DndModule.forRoot()
  ],
  declarations: [
    HideDonePipe,
    AppComponent,
    TopNavComponent,
    LoginComponent,
    RegistrationComponent,
    WishComponent,
    WishListComponent,
    WishInListComponent
    /*ClickOutside*/
  ],
  providers: [
    LS,
    CustomValidationService,
    BaseWishListService,
    AuthService,
    WishService,
    WishListService,
    WishInListService,
    ApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
