import { Component, OnInit } from '@angular/core';
import { BookDetail } from 'src/app/shared/book-detail.model';
import { BookDetailService } from 'src/app/shared/book-detail.service';
import { DatePipe, Location } from '@angular/common';
import { Borrowing } from 'src/app/shared/borrowing.model';
import { BorrowingService } from 'src/app/shared/borrowing.service';


@Component({
  selector: 'app-book-detail-card',
  templateUrl: './book-detail-card.component.html',
  styles: []
})
export class BookDetailCardComponent implements OnInit {

  constructor(private bookService: BookDetailService, private borrowingService: BorrowingService) { }
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
}
