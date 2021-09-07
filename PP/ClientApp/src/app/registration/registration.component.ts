import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(
    private _toastr: ToastrService,
    public service: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.service.formModel.reset();
    if (localStorage.getItem('token') != null)
      this._router.navigateByUrl('/profile');
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this._toastr.success('Utworzono nowego użytkownika!', 'Sukces.')
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this._toastr.error('Nazwa użytkownika zajęta.', 'Niepowodzenie.')
                break;
              default:
                this._toastr.error(element.description, 'Niepowodzenie.')

                break;

            }
          })
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
