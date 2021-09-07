import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../shared/services/librarian.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-librarians-list',
  templateUrl: './librarians-list.component.html',
  styles: []
})
export class LibrariansListComponent implements OnInit {

  private canOpen;
  permitedRoles = ["Admin", "Bibliotekarz"];

  constructor(public service: LibrarianService,
    private _userService: UserService,
    private _router: Router) {
      if (localStorage.getItem('token') != null) {
        this.canOpen = _userService.roleMatch(this.permitedRoles);
        }
        else {
          this.canOpen = false;
        }
     }

  ngOnInit(): void {
    if (this.canOpen == false) {
            this._router.navigateByUrl('/books-list');
          }
  }
}