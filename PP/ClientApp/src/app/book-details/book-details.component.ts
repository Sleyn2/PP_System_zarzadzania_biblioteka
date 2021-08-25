import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';
import { BorrowingService } from 'src/app/shared/services/borrowing.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsEditComponent } from './book-details-edit/book-details-edit.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})

export class BookDetailsComponent implements OnInit {
  constructor(
    private bookService: BookService, 
    private borrowingService: BorrowingService, 
    private auth: UserService, 
    private route: ActivatedRoute, 
    private modalService: NgbModal
    ) {
    if (localStorage.getItem('token') != null) {
      this.isUser = auth.roleMatchSingle("User");
      this.canEditBook = auth.roleMatch(this.permitedRoles);
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
        // if () {
        //   this.cardData.avaliableCount--;
        //   this.borrowingService.addBorrowing(this.bookId).subscribe();
        // }
      }
      else {
        // this.toast
      }
    }
  }

  editBook(): void {
    const modalRef = this.modalService.open(BookDetailsEditComponent);
    modalRef.componentInstance.bookDetails = this.cardData;
  }
}
