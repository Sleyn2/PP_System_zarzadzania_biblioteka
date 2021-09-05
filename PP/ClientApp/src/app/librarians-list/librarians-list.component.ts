import { Component, OnInit } from '@angular/core';
import { LibrarianService } from '../shared/services/librarian.service';

@Component({
  selector: 'app-librarians-list',
  templateUrl: './librarians-list.component.html',
  styles: []
})
export class LibrariansListComponent implements OnInit {

  constructor(public service: LibrarianService) { }

  ngOnInit(): void {

  }
}