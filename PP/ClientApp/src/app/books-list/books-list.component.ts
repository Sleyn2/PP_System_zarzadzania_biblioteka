import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: []
})
export class BooksListComponent implements OnInit {

  constructor(public service: BookService) { }

  ngOnInit(): void {
    this.service.getAllBooks();
  }

}
