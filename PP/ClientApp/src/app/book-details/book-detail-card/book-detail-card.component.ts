import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDetail } from 'src/app/shared/book-detail.model';
import { BookDetailService } from 'src/app/shared/book-detail.service';

@Component({
  selector: 'app-book-detail-card',
  templateUrl: './book-detail-card.component.html',
  styles: []
})
export class BookDetailCardComponent implements OnInit {

  constructor(public service:BookDetailService) { }
  ngOnInit() {
    this.service.getBook(1);
    
  }

}
