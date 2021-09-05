import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-librarian-detail',
  templateUrl: './librarian-detail.component.html',
  styles: []
})
export class LibrarianDetailComponent implements OnInit {
  
  @Input() librarianId: String;
  public user;
  public userDetails = new User;
  private canOpenDetail;
  permitedRoles = ["Admin"];

  constructor(private route: ActivatedRoute, private userService: UserService, private _router: Router) {
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
    
    await this.route.params.subscribe(params => { this.librarianId = (params['librarianId']); });
    await this.userService.getUserDetails(this.librarianId).toPromise().then(userDetails => this.user = userDetails);
    }
    else{
      this._router.navigateByUrl('/books-list');
    }

  }

}
