import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateBorrowingsModal } from 'src/app/borrowing/private-borrowing/private-borrowing.component';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ReaderEditComponent } from './reader-edit/reader-edit.component';

@Component({
  selector: 'app-reader-detail',
  templateUrl: './reader-detail.component.html',
  styles: []
})
export class ReaderDetailComponent implements OnInit {

  @Input() readerId: String;
  public user;
  public userDetails;
  public userEmail;
  public userName;
  public userFullName;
  private canOpenDetail;
  permitedRoles = ["Admin", "Bibliotekarz"];

  constructor(
    private _route: ActivatedRoute, 
    private _userService: UserService, 
    private _router: Router, 
    private _modalService: NgbModal) {
    if (localStorage.getItem('token') != null) {
      this.canOpenDetail = _userService.roleMatch(this.permitedRoles);
    }
    else {
      this.canOpenDetail = false;
    }
  }

  async ngOnInit() {

    if (this.canOpenDetail == true) {
      this._userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res
        },
        err => {
          if (err.status === 401) {
            this._router.navigateByUrl('/user/login');
          }
        });

      await this._route.params.subscribe(params => { this.readerId = (params['readerId']); });
      await this._userService.getUserDetails(this.readerId).toPromise().then(userDetails => this.user = userDetails);
      if (this.user.email == null) {
        this.userEmail = "Nie ustawiono";
      }
      else {
        this.userEmail = this.user.email;
      }
      if (this.user.fullName == null) {
        this.userFullName = "Nie ustawiono";
      }
      else {
        this.userFullName = this.user.fullName;
      }
      this.userName = this.user.userName;
    }
    else {
      this._router.navigateByUrl('/books-list');
    }
  }

  async editReader(){
    const modalRef = this._modalService.open(ReaderEditComponent);
    modalRef.componentInstance.readerDetail = this.user;
    await modalRef.result.then(async (result) => 
    {
     if(result=='Success')
      {
        await this._userService.getUserDetails(this.readerId).toPromise().then(userDetails => this.user = userDetails);
      }
    }).catch((result) => { });
  }

  readerBorrowingHistory() {
    const modalRef = this._modalService.open(PrivateBorrowingsModal, { size: 'lg' });
    modalRef.componentInstance.userId = this.readerId;
  }

}
