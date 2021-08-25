import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookAddModal } from '../book-details/book-details-add/book-details-add.component';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(
    private _modalService: NgbModal,
    public auth: UserService,
    private _toastr: ToastrService
  ) { }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.auth.isLoggedIn = this.auth.roleMatch(["Admin", "User", "Bibliotekarz"]);
    this.auth.isAdmin = this.auth.roleMatchSingle("Admin");
    this.auth.isBibliotekarz = this.auth.roleMatchSingle("Bibliotekarz");
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.auth.isLoggedIn = false;
    this.auth.isAdmin = false;
  }

  addBook() {
    const modalRef = this._modalService.open(BookAddModal, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result === 'Success') {
        this._toastr.success('Pomyślnie dodano książkę', 'Sukces!', { timeOut: 5000 });
      } else if (result === 'Close click') {
        this._toastr.error('Anulowano edycję', 'Niepowodzenie', { timeOut: 5000 });
      }
    }, (reason) => {
      this._toastr.error('Anulowano edycję', 'Niepowodzenie', { timeOut: 5000 });
    });
  }
}
