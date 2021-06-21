import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-books-list-form',
  templateUrl: './books-list-form.component.html',
  styles: []
})
export class BooksListFormComponent implements OnInit {

  constructor(public service:BookService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    
  }
}
