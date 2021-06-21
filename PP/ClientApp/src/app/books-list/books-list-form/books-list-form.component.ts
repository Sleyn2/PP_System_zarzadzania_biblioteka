import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksListService } from 'src/app/shared/books-list.service';

@Component({
  selector: 'app-books-list-form',
  templateUrl: './books-list-form.component.html',
  styles: []
})
export class BooksListFormComponent implements OnInit {

  constructor(public service:BooksListService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    
  }
}