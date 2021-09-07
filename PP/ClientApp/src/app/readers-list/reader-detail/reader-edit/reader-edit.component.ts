import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reader-edit',
  templateUrl: './reader-edit.component.html',
  styles: []
})
export class ReaderEditComponent implements OnInit {

  @Input() readerDetail;
  public readerFullName;

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.readerDetail.fullName === null || this.readerDetail.fullName === '') {
      this.readerFullName = "Nie ustawiono";
    }
    else {
      this.readerFullName = this.readerDetail.fullName;
    }
  }

  changeReaderData() {
    if (this.readerFullName != "Nie ustawiono") {
      this.readerDetail.fullName = this.readerFullName
      this.userService.updateUser(this.readerDetail).subscribe((res: any) => {
        this.toastr.success('Pomyślnie zaktualizowano dane', 'Sukces!', { timeOut: 5000 });
        this.activeModal.close('Success')
      }, err => {
        this.toastr.warning('Nie ustawiono parametru', 'Błąd', { timeOut: 5000 });
      })
    }
    else this.toastr.warning('Nie ustawiono parametru', 'Błąd', { timeOut: 5000 });
  }
}
