import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { LibrarianEditComponent } from './librarian-edit/librarian-edit.component';

@Component({
  selector: 'app-librarian-detail',
  templateUrl: './librarian-detail.component.html',
  styles: []
})
export class LibrarianDetailComponent implements OnInit {

  @Input() librarianId: String;
  public user;
  public userDetails;
  public userEmail;
  public userName;
  public userFullName;
  private canOpenDetail;
  permitedRoles = ["Admin"];

  constructor(private route: ActivatedRoute, private userService: UserService, private modalService: NgbModal, private _router: Router) {
    if (localStorage.getItem('token') != null) {
      this.canOpenDetail = userService.roleMatch(this.permitedRoles);
    }
    else {
      this.canOpenDetail = false;
    }
  }

  async ngOnInit() {

    if (this.canOpenDetail == true) {
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res
        },
        err => {
          if (err.status === 401) {
            this._router.navigateByUrl('/user/login');
          }
        });

      await this.route.params.subscribe(params => { this.librarianId = (params['librarianId']); });
      await this.userService.getUserDetails(this.librarianId).toPromise().then(userDetails => this.user = userDetails);
      if (this.user.email === null || this.user.email === '') {
        this.userEmail = "Nie ustawiono";
      }
      else {
        this.userEmail = this.user.email;
      }
      if (this.user.fullName === null || this.user.fullName === '') {
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


  async editLibrarian() {
    const modalRef = this.modalService.open(LibrarianEditComponent);
    modalRef.componentInstance.librarianDetail = this.user;
    await modalRef.result.then(async (result) => {
      if (result == 'Success') {
        await this.userService.getUserDetails(this.librarianId).toPromise().then(userDetails => {
          this.user = userDetails;
          this.userFullName = userDetails.fullName;
        });
      }
    }).catch((result) => { });
  }

}
