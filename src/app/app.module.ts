import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DndModule } from 'ng2-dnd';
// import { ClickOutside } from './directives/click-outside.directive';

import { AppRoutingModule} from './routing/routing.module';

import { AppComponent} from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthService } from './auth/auth.service';

import { WishComponent } from './wish/wish.component';
import { WishService } from './wish/wish.service';

import { WishListComponent } from './wish-list/wish-list.component';
import { WishListService } from './wish-list/wish-list.service';

import { DataMockService } from './api/data-mock.service';
import { LS } from './services/local-storage.service';
import { CustomValidationService } from './services/custom-validation.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    DndModule.forRoot()
  ],
  declarations: [
    AppComponent,
    WishComponent,
    LoginComponent,
    RegistrationComponent,
    WishListComponent/*,
    ClickOutside*/
  ],
  providers: [
    LS,
    CustomValidationService,
    DataMockService,
    AuthService,
    WishService,
    WishListService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
