import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(
    private service: UserService, 
    private router: Router, 
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/profile');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.service.isLoggedIn = true;

        this.toastr.success('Pomyślnie zalogowano', 'Sukces!', { timeOut: 5000 });

        if (this.service.roleMatchSingle('Admin')) {
          this.service.isAdmin = true;
        }
        this.router.navigateByUrl('/profile');
      },
      err => {
        if (err.status == 400)
          console.log(err);
        this.toastr.error(err.error.message, 'Niepowodzenie', { timeOut: 5000 });
      }
    );
  }
}
