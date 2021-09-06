import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-librarian-edit',
  templateUrl: './librarian-edit.component.html',
  styles: []
})
export class LibrarianEditComponent implements OnInit {
  
  @Input() librarianDetail;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    console.log(this.librarianDetail);
  }

  changeLibrarianData()
  {
  }

}
