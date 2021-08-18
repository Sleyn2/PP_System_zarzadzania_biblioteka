import { Component, OnInit } from '@angular/core';
import { ReaderService } from '../shared/services/reader.service';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styles: []
})
export class ReadersListComponent implements OnInit {

  constructor(public service: ReaderService) { }

  ngOnInit(): void {

  }

  readerDetails(id)
  {
    console.log(id);
  }
}