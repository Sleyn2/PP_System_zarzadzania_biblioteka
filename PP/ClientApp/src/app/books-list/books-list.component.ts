import { Component, OnInit } from '@angular/core';
import { BooksListService } from '../shared/books-list.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: []
})
export class BooksListComponent implements OnInit {

  constructor(public service: BooksListService) { }

  ngOnInit(): void {
    this.service.getSearchedBooks();
  }

}
