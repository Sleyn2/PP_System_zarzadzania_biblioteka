import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reader-edit',
  templateUrl: './reader-edit.component.html',
  styles: []
})
export class ReaderEditComponent implements OnInit {

  @Input() readerDetail;
  public readerFullName;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    if(this.readerDetail.fullName == null)
    {
      this.readerFullName = "Nie ustawiono";
    }
    else{
      this.readerFullName = this.readerDetail.fullName;
    }
  }

  changeReaderData()
  {
    if(this.readerFullName != "Nie ustawiono")
    {
      //aktualizacja
    }
  }

}
