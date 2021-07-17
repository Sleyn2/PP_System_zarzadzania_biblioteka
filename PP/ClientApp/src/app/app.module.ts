import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookDetailCardComponent } from './book-details/book-detail-card/book-detail-card.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { config } from 'rxjs';

const routes: Routes = [
  { path: '', component: BooksListComponent, pathMatch: 'full' },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  // ***PRZYKLAD JAK DODAWAC FUNKCJONALNOSC DO PRZYCISKU Z MENU (sam przycisk w nav-menu.component.html)***
  //{ path: 'counter', component: CounterComponent }, 
  { path: 'book-details', component: BookDetailsComponent }
]

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
    RegistrationComponent,
    LoginComponent,
    BookDetailsComponent,
    BookDetailCardComponent,
    ForbiddenComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
