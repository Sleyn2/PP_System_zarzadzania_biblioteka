import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReaderService } from '../shared/services/reader.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styles: []
})
export class ReadersListComponent implements OnInit {

  private canOpen;
  permitedRoles = ["Admin", "Bibliotekarz"];

  constructor(public service: ReaderService,
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