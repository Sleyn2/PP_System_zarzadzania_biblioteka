import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LibInformation } from "src/app/shared/export";
import { LibInfoService } from "src/app/shared/services/libInfo.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './footer-editor.component.html',
})
export class FooterModalContent {

    @Input() FooterDetails;

    constructor(public activeModal: NgbActiveModal, private service: LibInfoService, private libInfoService: LibInformation) { }

    save(){
        this.service.editInfo(this.FooterDetails).subscribe();
        this.libInfoService.updateLibInfo(this.service);
        this.activeModal.close('success');
    }

}