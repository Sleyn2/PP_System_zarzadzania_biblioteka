import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FooterModalContent } from '../footer/footer-editor/footer-editor.component';
import { LibInformation } from '../shared/export';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
// import { UserDetailsModal } from '../user/user-details.component/user-details.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent {
  closeResult = '';
  public userDetails = new User;
  public isAdmin = false;
  public isBibliotekarz = false;
  public isUser = false;

  @Output() messegeEvent = new EventEmitter<string>();

  constructor(
    private _userService: UserService,
    private _modalService: NgbModal,
    private auth: UserService,
    private _libInfoService: LibInformation,
    private _toastr: ToastrService
  ) {
    if (localStorage.getItem('token') != null) {
      this.isAdmin = auth.roleMatchSingle("Admin");
      this.isBibliotekarz = auth.roleMatchSingle("Bibliotekarz");
      this.isUser = auth.roleMatchSingle("User");

    }
  }

  ngOnInit() {
    this._userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res
      },
      err => {
        console.log(err)
      }
    );
  }

  editFooter() {
    const modalRef = this._modalService.open(FooterModalContent, { size: 'lg' });
    modalRef.componentInstance.FooterDetails = this._libInfoService.libInfo;
    modalRef.result.then((result) => {
      if (result === 'Success') {
        this.messegeEvent.emit('libInfoEdited');
        this._toastr.success('Pomyślnie zmieniono dane', 'Sukces!', { timeOut: 5000 });
      } else if (result === 'Same data') {
        this._toastr.info('Informacja', 'Dane nie zostały zmienione', { timeOut: 5000 });
      } else if (result === 'Close click') {
        this._toastr.error('Anulowano edycję', 'Niepowodzenie', { timeOut: 5000 });
      }
    }, (reason) => {
      this._toastr.error('Anulowano edycję', 'Niepowodzenie', { timeOut: 5000 });
    });
  }

  open() {
    this._toastr.warning('Wydaje mi się, że to @Alefront robi', 'Modal do zrobienia', { timeOut: 10000 });
  }

  reservedBorrowings() {
    this._toastr.info('edycja oczekujących zamówień', 'Modal do zrobienia', { timeOut: 5000 });
  }

  historyBorrowings() {
    this._toastr.info('historia zamówień', 'Modal do zrobienia', { timeOut: 5000 });
  }

  yourBorrowings() {
    this._toastr.info('historia twoich zamówień', 'Modal do zrobienia', { timeOut: 5000 });
  }
}
