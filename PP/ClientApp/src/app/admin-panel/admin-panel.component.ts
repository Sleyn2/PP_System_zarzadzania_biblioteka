import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LibInformation } from '../shared/export';
import { FooterModalContent } from '../footer/footer-editor/footer-editor.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {

  @Output() messegeEvent = new EventEmitter<string>();

  constructor(
    private modalService: NgbModal, 
    private libInfoService: LibInformation, 
    private toastr: ToastrService) { }

  ngOnInit() { }

  open() {
    const modalRef = this.modalService.open(FooterModalContent, { size: 'lg' });
    modalRef.componentInstance.FooterDetails = this.libInfoService.libInfo;
    modalRef.result.then((result) => {
      if (result === 'Success') {
        this.messegeEvent.emit('libInfoEdited');
        this.toastr.success('Pomyślnie zmieniono dane', 'Sukces!', { timeOut: 5000 });
      } else if (result === 'Same data') {
        this.toastr.info('Informacja', 'Dane nie zostały zmienione', { timeOut: 5000 });
      } else if (result === 'Close click') {
        this.toastr.error('Anulowano edycję', 'Niepowodzenie', { timeOut: 5000 });
      }
    }, (reason) => {
      this.toastr.error('Anulowano edycję', 'Niepowodzenie', { timeOut: 5000 });
    });
  }
}