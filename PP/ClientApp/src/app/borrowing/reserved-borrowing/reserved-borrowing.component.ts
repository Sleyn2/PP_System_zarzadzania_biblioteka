import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { BorrowingBook } from "src/app/shared/models/borrowingBook.model";
import { BorrowingService } from "src/app/shared/services/borrowing.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './reserved-borrowing.component.html',
})
export class ReservedBorrowingsModal {

    public borrowingList: Array<BorrowingBook>;

    constructor(
        public activeModal: NgbActiveModal,
        private _borrowingService: BorrowingService,
        private _toastr: ToastrService,
    ) {
        this.borrowingList = new Array<BorrowingBook>();
    }

    ngOnInit() {
        this._borrowingService.listReserved().subscribe(res => {
            this._toastr.success('Pomyślnie pobrano dane', 'Sukces!', { timeOut: 5000 });
            this.borrowingList = res;
            console.log(this.borrowingList);
        }, err => {
            console.log(err);
        });
    }

    save() {

    }
}
