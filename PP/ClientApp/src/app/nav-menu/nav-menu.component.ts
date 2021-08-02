import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: UserService) { }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit(){
    this.auth.isLoggedIn = this.auth.roleMatch(["Admin", "User", "Bibliotekarz"]);
    this.auth.isAdmin = this.auth.roleMatchSingle("Admin");
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.auth.isLoggedIn = false;
    this.auth.isAdmin = false;
  }
}
