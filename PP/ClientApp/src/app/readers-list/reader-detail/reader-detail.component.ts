import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reader-detail',
  templateUrl: './reader-detail.component.html',
  styles: []
})
export class ReaderDetailComponent implements OnInit {

  @Input() readerId: String;
  public user;
  public userDetails = new User;
  private canOpenDetail;
  permitedRoles = ["Admin", "Bibliotekarz"];

  constructor(private route: ActivatedRoute, private userService: UserService, private _router: Router,) { 
    if (localStorage.getItem('token') != null) {
      this.canOpenDetail = userService.roleMatch(this.permitedRoles);
    }
    else {
      this.canOpenDetail = false;
    }
  }

  async ngOnInit() {

    if(this.canOpenDetail==true)
    {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res
      },
      err => {
        if (err.status === 401) {
          this._router.navigateByUrl('/user/login');
        }
      });

    await this.route.params.subscribe(params => { this.readerId = (params['readerId']); });
    await this.userService.getUserDetails(this.readerId).toPromise().then(userDetails => this.user = userDetails);
    }
    else{
      this._router.navigateByUrl('/books-list');
    }
  }

  readerBorrowingHistory()
  {

  }

}
