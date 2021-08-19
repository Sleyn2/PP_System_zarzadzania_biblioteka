import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
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
        public activeModal: NgbActiveModal,
        private bookService: BookService,
        private toastr: ToastrService,
        private authorService: AuthorService
    ) { }

    ngOnInit(): void {
        this.authorService.getAllBooks().toPromise().then(list => {
            this.AuthorList = list
            if (this.AuthorList.length !== 0) this.toastr.info('Pomyślnie pobrano listę autorów', 'Baza danych', { timeOut: 5000 });
            else this.toastr.warning('Nie udało się pobrać listy autorów', 'Baza danych', { timeOut: 5000 });
        });
        this.BookDetails = new Book();
    }

    onChange() {
        this._id = this.selectedAuthor.id;
    }

    addAuthor() {
        //TODO: Sleyn
        //modal z dodawaniem autorów.
        this.toastr.success('Pomyślnie dodano autora', 'Sukces!', { timeOut: 5000 });

    }

    save() {
        if (this._id === 0)
            this.toastr.error('Wybierz autora', 'Błąd walidacji', { timeOut: 3000 });
        else if (this.BookDetails.title.trim() === '')
            this.toastr.error('Nieprawidłowy tytuł', 'Błąd walidacji', { timeOut: 3000 });
        else if (this.BookDetails.count <= 0 || this.BookDetails.count >= 1000000)
            this.toastr.error('Niewłaściwa ilość książek', 'Błąd walidacji', { timeOut: 3000 });
        else {
            this.BookDetails.authorId = this._id;
            console.log(this.BookDetails);
            this.bookService.addBook(this.BookDetails).subscribe(res=>{
                console.log(res);
            });
            this.activeModal.close('Success');
        }
    }
}