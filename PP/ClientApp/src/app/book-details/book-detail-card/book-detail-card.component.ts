import { Component, OnInit } from '@angular/core';
import { BookDetail } from 'src/app/shared/book-detail.model';
import { BookDetailService } from 'src/app/shared/book-detail.service';

@Component({
  selector: 'app-book-detail-card',
  templateUrl: './book-detail-card.component.html',
  styles: []
})
export class BookDetailCardComponent implements OnInit {

  constructor(private bookService: BookDetailService) { }
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
      }
      else{
      }
    }
  }
}
