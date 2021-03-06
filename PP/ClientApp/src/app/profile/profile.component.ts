import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HistoryBorrowingsModal } from '../borrowing/history-borrowing/history-borrowing.component';
import { OngoingBorrowingsModal } from '../borrowing/ongoing-borrowing/ongoing-borrowing.component';
import { PrivateBorrowingsModal } from '../borrowing/private-borrowing/private-borrowing.component';
import { ReservedBorrowingsModal } from '../borrowing/reserved-borrowing/reserved-borrowing.component';
import { FooterModalContent } from '../footer/footer-editor/footer-editor.component';
import { ProlongModal } from '../prolong/prolong.component';
import { LibInformation } from '../shared/export';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { RegisterModalComponent } from '../user/role-registration/role-registration.component';

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
        this._toastr.success('Pomy??lnie zmieniono dane', 'Sukces!', { timeOut: 5000 });
      } else if (result === 'Same data') {
        this._toastr.info('Informacja', 'Dane nie zosta??y zmienione', { timeOut: 5000 });
      } else if (result === 'Close click') {
        this._toastr.error('Anulowano edycj??', 'Niepowodzenie', { timeOut: 5000 });
      }
    }, (reason) => {
      this._toastr.error('Anulowano edycj??', 'Niepowodzenie', { timeOut: 5000 });
    });
  }

  open() {
    this._router.navigate(['/profile-details']);
  }

  addAcount(){
    const modalRef = this._modalService.open(RegisterModalComponent, { size: 'lg' });
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
    const modalRef = this._modalService.open(PrivateBorrowingsModal, { size: 'lg' });
  }
  
  showProlong(){
    const modalRef = this._modalService.open(ProlongModal, { size: 'lg' });
  }
}
