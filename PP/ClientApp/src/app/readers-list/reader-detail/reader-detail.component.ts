import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reader-detail',
  templateUrl: './reader-detail.component.html',
  styles: []
})
export class ReaderDetailComponent implements OnInit {

  @Input() readerId: String;
  public user;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => { this.readerId = (params['readerId']); });
    await this.userService.getUserDetails(this.readerId).toPromise().then(userDetails => this.user = userDetails);
    console.log(this.user);
  }

}
