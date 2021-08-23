import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/models/book.model';
import { Borrowing } from 'src/app/shared/models/borrowing.model';
import { BookService } from 'src/app/shared/services/book.service';
import { BorrowingService } from 'src/app/shared/services/borrowing.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsEditComponent } from './book-details-edit/book-details-edit.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})

export class BookDetailsComponent implements OnInit {
  constructor(private bookService: BookService, private borrowingService: BorrowingService, private auth: UserService, private route: ActivatedRoute, private modalService: NgbModal) { 
    if (localStorage.getItem('token') != null)
    {
    this.isUser=auth.roleMatchSingle("User");
    this.canEditBook=auth.roleMatch(this.permitedRoles);
    }
    else{
      this.isUser=false;
      this.canEditBook=false;
    }
  }

  @Input() bookId: number;
  permitedRoles = ["Admin","Bibliotekarz"];
  isUser = false;
  canEditBook = false;
  cardData: Book = new Book();

  ngOnInit() {
    this.route.params.subscribe(params => {this.bookId = +params['bookId'];});
    this.bookService.getBook(this.bookId).toPromise().then(book => this.cardData = book);
  }

  reserveBook(): void
  {
    if(this.cardData)
    {
      if(this.cardData.count>=1)
      {
        this.cardData.count = this.cardData.count-1;
        this.bookService.updateBook(this.cardData).subscribe();
        var borrowing = new Borrowing();
        borrowing.BookId= this.bookId;
        this.borrowingService.addBorrowing(borrowing).subscribe();
      }
      else{
      }
    }
  }
  
  editBook(): void
  {
    const modalRef = this.modalService.open(BookDetailsEditComponent);
    modalRef.componentInstance.bookDetails = this.cardData;
  }
}
