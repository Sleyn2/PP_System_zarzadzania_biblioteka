import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LibInformation } from "src/app/shared/export";
import { LibInfoService } from "src/app/shared/services/libInfo.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './footer-editor.component.html',
})
export class FooterModalContent {

    private orginalData;

    @Input() FooterDetails;

    constructor(public activeModal: NgbActiveModal, private service: LibInfoService, private libInfoService: LibInformation) { }

    ngOnInit() {
        this.orginalData = this.FooterDetails;
    }

    save() {
        if (this.orginalData != this.FooterDetails) {
            this.service.editInfo(this.FooterDetails).subscribe();
            this.libInfoService.updateLibInfo(this.service);
            this.activeModal.close('Success');
        } else {
            this.activeModal.close('Same data');
        }
    }
}