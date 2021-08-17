import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LibInfoService } from "src/app/shared/services/libInfo.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './footer-editor.component.html',
})
export class FooterModalContent {
    constructor(public activeModal: NgbActiveModal, private service: LibInfoService) { }
    @Input() FooterDetails;

    save() {
        this.service.editInfo(this.FooterDetails).subscribe();
        this.activeModal.close('success');
    }
}