import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Witaj!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="card m-5" style="width: 18rem" *ngIf="UserDetails">
  <ul class="list-group">
    <li class="list-group-item"><strong>Nazwa Użytkownika : </strong>{{UserDetails.userName}}</li>
    <li class="list-group-item"><strong>Pełna nazwa : </strong>{{UserDetails.fullName}}</li>
    <li class="list-group-item"><strong>Email : </strong>{{UserDetails.email}}</li>
  </ul>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Zamknij</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() UserDetails;

  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  closeResult = '';
  userDetails;

  constructor(private service: UserService, private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.UserDetails = this.userDetails;
  }
  
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
}
