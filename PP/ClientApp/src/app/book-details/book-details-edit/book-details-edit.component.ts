import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-details-edit',
  templateUrl: './book-details-edit.component.html',
  styles: []
})
export class BookDetailsEditComponent implements OnInit {


  @Input() bookDetails;

  private bookData;
  
  constructor(private bookService: BookService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.bookData=this.bookDetails;
  }

  changeBookData()
  {
    if (this.bookData != this.bookDetails) {
      this.bookService.updateBook(this.bookDetails).subscribe();
      this.activeModal.close('Success');
  } else {
      this.activeModal.close('Same data');
  }
  }

}
