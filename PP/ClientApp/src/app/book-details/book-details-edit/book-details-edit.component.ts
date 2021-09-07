import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/shared/models/author.model';
import { Book } from 'src/app/shared/models/book.model';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-details-edit',
  templateUrl: './book-details-edit.component.html',
  styles: []
})
export class BookDetailsEditComponent implements OnInit {
  @Input() bookDetails;

  private bookData = new Book;
  public authorList: Author[];
  public selectedAuthor;
  public originalBookAuthor = new Author;
  public originalBookAuthorName;
  public originalBookTitle;
  public originalBookCount;
  public bookCount;
  public bookTitle;
  private selectedAuthorId: number = 0;


  constructor(private bookService: BookService, public activeModal: NgbActiveModal, private authorService: AuthorService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.getAuthors();
    this.bookData=this.bookDetails;
    this.bookCount=this.bookData.count;
    this.bookTitle=this.bookData.title;
    this.originalBookCount=this.bookData.count;
    this.originalBookTitle=this.bookData.title;
    this.selectedAuthorId=this.bookData.authorId;
    await this.authorService.getAuthor(this.selectedAuthorId).toPromise().then(author => this.originalBookAuthor = author);
    this.originalBookAuthorName = this.originalBookAuthor.firstName  + " " + this.originalBookAuthor.lastName;
  }


  getAuthors(): void {
    this.authorService.getAllAuthors().toPromise().then(list => {
        this.authorList = list;
        list.forEach(element => {
          if(element.id === this.bookDetails.authorId) this.selectedAuthor = element;
        });
        if (this.authorList.length !== 0) this.toastr.info('Pomyślnie pobrano listę autorów', 'Baza danych', { timeOut: 5000 });
        else this.toastr.warning('Nie udało się pobrać listy autorów', 'Baza danych', { timeOut: 5000 });
    });
}
onChange() {
    this.selectedAuthorId = this.selectedAuthor.id;
}


  changeBookData()
  {
      this.bookData.authorId = this.selectedAuthorId;
      this.bookData.count=this.bookCount;
      this.bookData.title=this.bookTitle;
      this.bookService.updateBook(this.bookData).subscribe((res: any) => {
        this.activeModal.close('Success');
      }, err => {
        if(err.status == 409)
          this.toastr.warning('Zła liczba książek', 'Baza danych', { timeOut: 5000 });
          this.bookData.count=this.originalBookCount;
          this.bookData.title=this.originalBookTitle;
      });
  }

}
