import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from 'src/app/shared/services/author.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-librarian-edit',
  templateUrl: './librarian-edit.component.html',
  styles: []
})
export class LibrarianEditComponent implements OnInit {
  
  @Input() librarianFullName: String;

  constructor(public activeModal: NgbActiveModal, private authorService: AuthorService, private userService: UserService) { }

  ngOnInit() {
  }

  changeLibrarianData()
  {
  }

}
