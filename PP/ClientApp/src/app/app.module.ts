import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent, NgbdModalContent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksListFormComponent } from './books-list/books-list-form/books-list-form.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserService } from './shared/services/user.service';
import { LibInfoService } from './shared/services/libInfo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModalContent } from './admin-panel/footer-editor/footer-editor.component';
import { BookDetailsEditComponent } from './book-details/book-details-edit/book-details-edit.component';


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
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'book-details/:bookId', component: BookDetailsComponent}
]
  //********************************** */
  //Tutaj dodajemy wszsytkie komponenty
  //********************************** */
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
    ForbiddenComponent,
    AdminPanelComponent,
    NgbdModalContent,
    FooterModalContent,
    BookDetailsEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    NgbModule
  ],
  providers: [LibInfoService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  //********************************** */
  //Tutaj dodajemy komponenty dla modala
  //********************************** */
  entryComponents:[
    NgbdModalContent,
    FooterModalContent,
    BookDetailsEditComponent
  ]
})
export class AppModule { }
