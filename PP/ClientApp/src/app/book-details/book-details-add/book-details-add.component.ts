import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Author } from "src/app/shared/models/author.model";
import { Book } from "src/app/shared/models/book.model";
import { BookService } from "src/app/shared/services/book.service";


@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './book-details-add.component.html'
})
export class BookAddModal {
    public BookDetails: Book;
    public AuthorList: Array<Author>;

    constructor(public activeModal: NgbActiveModal, private service: BookService) {}

    ngOnInit() : void{
        this.BookDetails = new Book();
        this.AuthorList = [{id: 1, firstName:"hehe", lastName:"dsa"}, {id: 2, firstName:"hehhh", lastName:"nazwisko"}];
        console.log(this.AuthorList);
    }

    save(){
        
    }
}