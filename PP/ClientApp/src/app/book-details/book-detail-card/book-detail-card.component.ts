import { Component, OnInit } from '@angular/core';
import { BookDetail } from 'src/app/shared/book-detail.model';
import { BookDetailService } from 'src/app/shared/book-detail.service';

@Component({
  selector: 'app-book-detail-card',
  templateUrl: './book-detail-card.component.html',
  styles: []
})
export class BookDetailCardComponent implements OnInit {

  constructor(private service: BookDetailService) { }

  cardData: BookDetail = new BookDetail();
  ngOnInit() {
    this.service.getBook(2).toPromise().then(book => this.cardData = book);
  }
}
