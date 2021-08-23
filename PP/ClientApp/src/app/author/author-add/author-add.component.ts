import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Author } from "src/app/shared/models/author.model";
import { AuthorService } from "src/app/shared/services/author.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './author-add.component.html'
})
export class AuthorAddModal {

    public formData: Author;

    @Input() AuthorList;

    constructor(
        public activeModal: NgbActiveModal,
        private _authorService: AuthorService,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.formData = new Author();
    }

    save() {
        this._authorService.checkIfAuthorExist(this.formData.firstName, this.formData.lastName).subscribe(result => {
            if (result) {
                this.toastr.error('Dany autor już istnieje', 'Błąd walidacji', { timeOut: 3000 });
            } else {
                this._authorService.addAuthor(this.formData).subscribe((res: any) => {
                    this.activeModal.close('Success');
                }, err => {
                    if (err.status == 400)
                        console.log(err);
                    this.toastr.error(err.error.message, 'Niepowodzenie', { timeOut: 5000 });
                });
            }
        });
    }
}