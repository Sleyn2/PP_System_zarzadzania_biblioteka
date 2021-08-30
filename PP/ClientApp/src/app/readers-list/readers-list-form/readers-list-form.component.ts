import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReaderService } from 'src/app/shared/services/reader.service';

@Component({
  selector: 'app-readers-list-form',
  templateUrl: './readers-list-form.component.html',
  styles: []
})
export class ReadersListFormComponent implements OnInit {

  constructor(public service:ReaderService) { }

  ngOnInit(): void {
    this.service.getAllReaders();
  }

  onSubmit(form:NgForm){
    this.service.getReaders(form.controls['user'].value);
  }
}