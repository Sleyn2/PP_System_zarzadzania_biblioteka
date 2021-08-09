import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibInfo } from '../shared/models/libInfo.model';
import { LibInfoService } from '../shared/services/libInfo.service';
import { FooterModalContent } from './footer-editor/footer-editor.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {

  constructor(private info: LibInfoService, private modalService: NgbModal) { }

  libInfo: LibInfo = new LibInfo();

  ngOnInit() {
    this.info.getInfo().toPromise().then(data => this.libInfo = data);
  }

  open() {
    const modalRef = this.modalService.open(FooterModalContent, {size: 'lg'});
    modalRef.componentInstance.FooterDetails = this.libInfo;
  }
}