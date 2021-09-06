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

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
  }

  changeReaderData()
  {
    
  }

}
