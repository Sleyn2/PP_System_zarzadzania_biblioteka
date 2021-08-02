import { Component, OnInit } from '@angular/core';
import { BookDetail } from 'src/app/shared/models/book-detail.model';
import { BookDetailService } from 'src/app/shared/services/book-detail.service';
import { Borrowing } from 'src/app/shared/models/borrowing.model';
import { BorrowingService } from 'src/app/shared/services/borrowing.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-book-detail-card',
  templateUrl: './book-detail-card.component.html',
  styles: []
})
export class BookDetailCardComponent implements OnInit {

  constructor(private bookService: BookDetailService, private borrowingService: BorrowingService, private auth: UserService) { 
    this.isUser=auth.roleMatchSingle("User");
    this.canEditBook=auth.roleMatch(this.permitedRoles);
  }

  permitedRoles = ["Admin","Bibliotekarz"];
  isUser = false;
  canEditBook = false;
  bookId: number = 2;
  cardData: BookDetail = new BookDetail();

  ngOnInit() {
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

  }
}
