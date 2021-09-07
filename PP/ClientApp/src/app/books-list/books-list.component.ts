import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: []
})
export class BooksListComponent implements OnInit {

  constructor(public service: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }
}
