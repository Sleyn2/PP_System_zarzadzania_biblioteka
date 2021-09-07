import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { BorrowingBook } from "src/app/shared/models/borrowingBook.model";
import { ProlongService } from "src/app/shared/services/prolong.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './prolong.component.html',
    styles: ['table, th, tr{ border:1px solid black; text-align: center; font-weight: normal;}']
})
export class ProlongModal {

    public prolongList;

    constructor(
        public activeModal: NgbActiveModal,
        private _toastr: ToastrService,
        private _prolongService: ProlongService
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this._prolongService.getProlongRequests().subscribe(res => {
            this._toastr.success('Pomyślnie pobrano dane', 'Sukces!', { timeOut: 5000 });
            this.prolongList = res;
        }, err => {
            console.log(err);
        });
    }

    accept(obj: BorrowingBook) {
        this._prolongService.acceptProlongRequest(obj.id).subscribe(res=> this.getData());
        this._toastr.info('Pomyślnie zaakceptowano prośbę', 'Informacja', { timeOut: 5000 });
    }

    reject(obj: BorrowingBook) {
        this._prolongService.rejectProlongRequest(obj.id).subscribe(res=> this.getData());
        this._toastr.info('Pomyślnie usunięto prośbę', 'Informacja', { timeOut: 5000 });
    }
}
