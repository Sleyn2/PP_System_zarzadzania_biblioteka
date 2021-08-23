import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-readers-list-form',
  templateUrl: './readers-list-form.component.html',
  styles: []
})
export class ReadersListFormComponent implements OnInit {

  constructor(public service:BookService) { }

  ngOnInit(): void {
    //this.service.getAllBooks();
  }

  onSubmit(form:NgForm){
    //this.service.getBooks(form.controls['title'].value);
  }
}