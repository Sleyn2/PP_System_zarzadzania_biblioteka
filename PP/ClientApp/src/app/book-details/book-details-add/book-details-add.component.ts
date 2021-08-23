import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthorAddModal } from "src/app/author/author-add/author-add.component";
import { Author } from "src/app/shared/models/author.model";
import { Book } from "src/app/shared/models/book.model";
import { AuthorService } from "src/app/shared/services/author.service";
import { BookService } from "src/app/shared/services/book.service";


@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './book-details-add.component.html'
})
export class BookAddModal {
    public BookDetails: Book;
    public AuthorList: Author[];
    public selectedAuthor;
    private _id: number = 0;

    constructor(
        private _modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private _bookService: BookService,
        private _toastr: ToastrService,
        private _authorService: AuthorService
    ) { }

    ngOnInit(): void {
        this.getAuthors();
        this.BookDetails = new Book();
    }

    getAuthors(): void {
        this._authorService.getAllAuthors().toPromise().then(list => {
            this.AuthorList = list
            if (this.AuthorList.length !== 0) this._toastr.info('Pomyślnie pobrano listę autorów', 'Baza danych', { timeOut: 5000 });
            else this._toastr.warning('Nie udało się pobrać listy autorów', 'Baza danych', { timeOut: 5000 });
        });
    }
    onChange() {
        this._id = this.selectedAuthor.id;
    }

    addAuthor() {
        const modalRef = this._modalService.open(AuthorAddModal, { size: 'lg' });
        modalRef.result.then((result) => {
            if (result === 'Success') {
                this.getAuthors();
                this._toastr.success('Pomyślnie dodano autora', 'Sukces!', { timeOut: 5000 });
            } else if (result === 'Close click') {
                this._toastr.error('Anulowano dodawanie', 'Niepowodzenie', { timeOut: 5000 });
            }
        }, (reason) => {
            this._toastr.error('Anulowano dodawanie', 'Niepowodzenie', { timeOut: 5000 });
        });

    }

    save() {
        if (this._id === 0)
            this._toastr.error('Wybierz autora', 'Błąd walidacji', { timeOut: 3000 });
        else if (this.BookDetails.title.trim() === '')
            this._toastr.error('Nieprawidłowy tytuł', 'Błąd walidacji', { timeOut: 3000 });
        else if (this.BookDetails.count <= 0 || this.BookDetails.count >= 1000000)
            this._toastr.error('Niewłaściwa ilość książek', 'Błąd walidacji', { timeOut: 3000 });
        else {
            this.BookDetails.authorId = this._id;
            console.log(this.BookDetails);
            this._bookService.addBook(this.BookDetails).subscribe((res: any) => {
                this.activeModal.close('Success');
            }, err => {
                if (err.status == 400)
                    console.log(err);
                this._toastr.error(err.error.message, 'Niepowodzenie', { timeOut: 5000 });
            });

        }
    }
}