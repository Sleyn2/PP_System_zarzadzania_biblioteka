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

  showSuccess() {
    this.toastr.success('Success!', 'Loaded app!', { timeOut: 5000 });
    this.toastr.error('Error', 'failed to start', { timeOut: 5000 });
    this.toastr.warning('Warning', 'Don`t do it', { timeOut: 5000 });
    this.toastr.info('Info', 'Fetched data', { timeOut: 5000 });
  }

  bookDetails(id) {
    console.log(id);
  }
}
