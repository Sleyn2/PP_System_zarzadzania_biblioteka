import { Component } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/services/user.service';
import { UserDetailsModal } from '../user/user-details.component/user-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  closeResult = '';
  userDetails;

  constructor(private service: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res
      },
      err => {
        console.log(err)
      }
    );
  }

  open() {
    const modalRef = this.modalService.open(UserDetailsModal);
    modalRef.componentInstance.UserDetails = this.userDetails;
  }
}
