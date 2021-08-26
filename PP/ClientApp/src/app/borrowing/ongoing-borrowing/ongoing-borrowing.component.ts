import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { BorrowingBook } from "src/app/shared/models/borrowingBook.model";
import { BorrowingService } from "src/app/shared/services/borrowing.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './ongoing-borrowing.component.html',
    styles: ['table, th, tr{ border:1px solid black; text-align: center; font-weight: normal;}']
})
export class OngoingBorrowingsModal {

    public borrowingList: Array<BorrowingBook>;

    constructor(
        public activeModal: NgbActiveModal,
        private _borrowingService: BorrowingService,
        private _toastr: ToastrService,
    ) {
        this.borrowingList = new Array<BorrowingBook>();
    }

    ngOnInit() {
        this.getData();
    }

    getData(){
        this._borrowingService.listOngoing().subscribe(res => {
            this._toastr.success('Pomyślnie pobrano dane', 'Sukces!', { timeOut: 5000 });
            this.borrowingList = res;
            console.log(this.borrowingList);
        }, err => {
            console.log(err);
        });
    }

    delete(obj: BorrowingBook) {
        this._borrowingService.delete(obj.id).subscribe(res => {
            this._toastr.info('Pomyślnie zakończono wypożyczenie', 'Informacja', { timeOut: 5000 });
            this.getData();
        }, err => {
            console.log(err);
        });
    }
}
