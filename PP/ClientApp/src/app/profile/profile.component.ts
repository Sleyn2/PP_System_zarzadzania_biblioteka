import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HistoryBorrowingsModal } from '../borrowing/history-borrowing/history-borrowing.component';
import { OngoingBorrowingsModal } from '../borrowing/ongoing-borrowing/ongoing-borrowing.component';
import { ReservedBorrowingsModal } from '../borrowing/reserved-borrowing/reserved-borrowing.component';
import { FooterModalContent } from '../footer/footer-editor/footer-editor.component';
import { LibInformation } from '../shared/export';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

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
    private _toastr: ToastrService,
    private _router: Router,

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
        if (err.status === 401) {
          this.messegeEvent.emit('checkToken');
          console.log('sprawdzam');
          this._router.navigateByUrl('/user/login');
        }
        else
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
    this._router.navigate(['/profile-details'], { queryParams: { name: 'stefan' }});
    this._toastr.warning('Wydaje mi się, że to @Alefront robi', 'Modal do zrobienia', { timeOut: 10000 });
  }

  reservedBorrowings() {
    const modalRef = this._modalService.open(ReservedBorrowingsModal, { size: 'lg' });
  }

  historyBorrowings() {
    const modalRef = this._modalService.open(HistoryBorrowingsModal, { size: 'lg' });
  }

  ongoingBorrowings(){
    const modalRef = this._modalService.open(OngoingBorrowingsModal, { size: 'lg' });
  }

  yourBorrowings() {
    this._toastr.info('historia twoich zamówień', 'Modal do zrobienia', { timeOut: 5000 });
  }
}
