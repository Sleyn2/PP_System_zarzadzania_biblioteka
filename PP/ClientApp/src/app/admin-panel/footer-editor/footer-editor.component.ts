import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './footer-editor.component.html',
})
export class FooterModalContent {
    @Input() FooterDetails;

    constructor(public activeModal: NgbActiveModal) { }
}