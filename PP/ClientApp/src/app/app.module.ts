import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProfileComponent } from './profile/profile.component';
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
import { UserService } from './shared/services/user.service';
import { LibInfoService } from './shared/services/libInfo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModalContent } from './footer/footer-editor/footer-editor.component';
import { BookDetailsEditComponent } from './book-details/book-details-edit/book-details-edit.component';
import { BookAddModal } from './book-details/book-details-add/book-details-add.component';
import { ReadersListComponent } from './readers-list/readers-list.component';
import { ReadersListFormComponent } from './readers-list/readers-list-form/readers-list-form.component';
import { AuthorAddModal } from './author/author-add/author-add.component';
import { FooterComponent } from './footer/footer.component';
import { ReservedBorrowingsModal } from './borrowing/reserved-borrowing/reserved-borrowing.component';
import { OngoingBorrowingsModal } from './borrowing/ongoing-borrowing/ongoing-borrowing.component';
import { HistoryBorrowingsModal } from './borrowing/history-borrowing/history-borrowing.component';
import { LibrariansListComponent } from './librarians-list/librarians-list.component';
import { LibrariansListFormComponent } from './librarians-list/librarians-list-form/librarians-list-form.component';
import { ReaderDetailComponent } from './readers-list/reader-detail/reader-detail.component';


const routes: Routes = [
  { path: '', component: BooksListComponent, pathMatch: 'full' },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  // ***PRZYKLAD JAK DODAWAC FUNKCJONALNOSC DO PRZYCISKU Z MENU (sam przycisk w nav-menu.component.html)***
  //{ path: 'counter', component: CounterComponent }, 
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'book-details/:bookId', component: BookDetailsComponent },
  { path: 'readers', component: ReadersListComponent},
  { path: 'librarians', component: LibrariansListComponent},
  { path: 'reader-detail', component: ReaderDetailComponent },
  { path: 'books-list', component: BooksListComponent },
  { path: 'readers/reader-detail/:readerId', component: ReaderDetailComponent }
]
//********************************** */
//Tutaj dodajemy wszsytkie komponenty
//********************************** */
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProfileComponent,
    FooterComponent,
    CounterComponent,
    FetchDataComponent,
    BooksListComponent,
    BooksListFormComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    BookDetailsComponent,
    ForbiddenComponent,
    FooterModalContent,
    BookDetailsEditComponent,
    BookAddModal,
    ReadersListComponent,
    ReadersListFormComponent,
    AuthorAddModal,
    ReservedBorrowingsModal,
    OngoingBorrowingsModal,
    HistoryBorrowingsModal,
    LibrariansListComponent,
    LibrariansListFormComponent,
    ReaderDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    NgbModule    
  ],
  providers: [
    LibInfoService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  //********************************** */
  //Tutaj dodajemy komponenty dla modala
  //********************************** */
  entryComponents: [
    FooterModalContent,
    BookDetailsEditComponent,
    BookAddModal,
    AuthorAddModal,
    ReservedBorrowingsModal,
    OngoingBorrowingsModal,
    HistoryBorrowingsModal
  ]
})
export class AppModule { }
