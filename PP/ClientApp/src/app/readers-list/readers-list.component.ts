import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styles: []
})
export class ReadersListComponent implements OnInit {

  constructor(public service: BookService) { }

  ngOnInit(): void {

  }

  readerDetails(id)
  {
    console.log(id);
  }
}