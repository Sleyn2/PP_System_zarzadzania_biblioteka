import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibInformation } from '../shared/export';
import { LibInfo } from '../shared/models/libInfo.model';
import { LibInfoService } from '../shared/services/libInfo.service';
import { FooterModalContent } from './footer-editor/footer-editor.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {

  @Output() messegeEvent = new EventEmitter<string>();

  constructor(private modalService: NgbModal, private libInfoService: LibInformation) { }

  ngOnInit() { }

  open() {
    const modalRef = this.modalService.open(FooterModalContent, { size: 'lg' });
    modalRef.componentInstance.FooterDetails = this.libInfoService.libInfo;
    modalRef.result.then((result) => {
      if (result === 'success') this.messegeEvent.emit('libInfoEdited');
    }, (reason) => {
      //if closed
    });
  }
}