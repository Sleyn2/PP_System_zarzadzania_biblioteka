import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LibrarianService } from 'src/app/shared/services/librarian.service';

@Component({
  selector: 'app-librarians-list-form',
  templateUrl: './librarians-list-form.component.html',
  styles: []
})
export class LibrariansListFormComponent implements OnInit {

  constructor(public service:LibrarianService) { }

  ngOnInit(): void {
    this.service.getAllLibrarians();
  }

  onSubmit(form:NgForm){
    this.service.getLibrarians(form.controls['librarian'].value);
  }
}