import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksListFormComponent } from './books-list/books-list-form/books-list-form.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';






@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BooksListComponent,
    BooksListFormComponent,
    UserComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: BooksListComponent, pathMatch: 'full' },
      { path: 'reg', redirectTo: '/user/registration', pathMatch: 'full' },
      {
        path: 'user', component: UserComponent, children: [
          { path: 'registration', component: RegistrationComponent }
        ]
      }
      // ***PRZYKLAD JAK DODAWAC FUNKCJONALNOSC DO PRZYCISKU Z MENU (sam przycisk w nav-menu.component.html)***
      //{ path: 'counter', component: CounterComponent }, 
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
