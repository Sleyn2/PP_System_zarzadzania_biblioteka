import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { libInfo } from '../app.component';
import { FooterModalContent } from './footer-editor/footer-editor.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  open() {
    const modalRef = this.modalService.open(FooterModalContent, { size: 'lg' });
    modalRef.componentInstance.FooterDetails = libInfo;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.messageEvent.emit(result)
        console.log('done');
      }
    }, (reason) => { //if closed
    });
  }
}