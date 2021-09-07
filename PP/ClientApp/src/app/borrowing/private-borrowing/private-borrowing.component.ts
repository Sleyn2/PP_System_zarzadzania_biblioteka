import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { BorrowingBook } from "src/app/shared/models/borrowingBook.model";
import { BorrowingService } from "src/app/shared/services/borrowing.service";
import { ProlongService } from "src/app/shared/services/prolong.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './private-borrowing.component.html',
    styles: ['table, th, tr{ border:1px solid black; text-align: center; font-weight: normal;}']
})
export class PrivateBorrowingsModal {
    @Input() userId;

    public borrowingList: Array<BorrowingBook>;

    constructor(
        public activeModal: NgbActiveModal,
        private _borrowingService: BorrowingService,
        private _toastr: ToastrService,
        private _prolongService: ProlongService
    ) {
        this.borrowingList = new Array<BorrowingBook>();
    }

    ngOnInit() {
        this.getData();
        console.log(this.userId)
    }

    getData() {

        this._borrowingService.listAllPrivate(this.userId).subscribe(res => {
            this._toastr.success('Pomyślnie pobrano dane', 'Sukces!', { timeOut: 5000 });
            this.borrowingList = res;
        }, err => {
            console.log(err);
        });
    }

    prolong(obj: BorrowingBook) {
        this._prolongService.createProlongRequest(obj.id).subscribe();
    }
}
