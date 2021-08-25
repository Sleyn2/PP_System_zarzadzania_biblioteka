import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-details-edit',
  templateUrl: './book-details-edit.component.html',
  styles: []
})
export class BookDetailsEditComponent implements OnInit {


  @Input() bookDetails;

  constructor() { }

  ngOnInit() {
  }

}
