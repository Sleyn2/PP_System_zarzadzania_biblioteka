import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';
import { BorrowingService } from 'src/app/shared/services/borrowing.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsEditComponent } from './book-details-edit/book-details-edit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})

export class BookDetailsComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private borrowingService: BorrowingService,
    private _auth: UserService,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    if (localStorage.getItem('token') != null) {
      this.isUser = _auth.roleMatchSingle("User");
      this.canEditBook = _auth.roleMatch(this.permitedRoles);
    }
    else {
      this.isUser = false;
      this.canEditBook = false;
    }
  }

  @Input() bookId: number;
  permitedRoles = ["Admin", "Bibliotekarz"];
  isUser = false;
  canEditBook = false;
  cardData: Book = new Book();

  ngOnInit() {
    this.route.params.subscribe(params => { this.bookId = +params['bookId']; });
    this.bookService.getBook(this.bookId).toPromise().then(book => this.cardData = book);
  }

  reserveBook(): void {
    if (this.cardData) {
      if (this.cardData.avaliableCount >= 1) {
        this.borrowingService.canBorrow(this.bookId).subscribe((res: any) => {
          this._toastr.success('Złożono rezerwację', 'Sukces!', { timeOut: 5000 })
        }, err => {
          if (err.status == 400)
            console.log(err);
          this._toastr.error('Książka jest już zarezerwowana', 'Niepowodzenie', { timeOut: 5000 });
        });
      }
    }
  }

  editBook(): void {
    const modalRef = this.modalService.open(BookDetailsEditComponent);
    modalRef.componentInstance.bookDetails = this.cardData;
  }
}
