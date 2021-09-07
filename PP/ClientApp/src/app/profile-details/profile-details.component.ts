import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileDetailsServiceService } from './service/profile-details-service.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  name: string

  userDataForm : FormGroup
  userDetails = new User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private _toastr: ToastrService,
    public service: UserService,
    private fb: FormBuilder,
    private serviceDetails: ProfileDetailsServiceService
  ) { }

  ngOnInit() {

    this.userDataForm = this.fb.group({
      userName: [''],
      email: [''],
      fullname: [''],
      passwd: ['', [Validators.minLength(4)]],
      chcekPasswd: ['']
    }, { validators: this.comparePasswords });

    this.userService.getUserProfile().subscribe(res => {
      this.userDetails = res
      this.userDataForm.patchValue({ userName: this.userDetails.userName });
      this.userDataForm.patchValue({ email: this.userDetails.email });
      this.userDataForm.patchValue({ fullname: this.userDetails.fullName });
      },
      err => {
        if (err.status === 401) {
          console.log('sprawdzam');
        }
        else
          console.log(err)
      })
  }

  comparePasswords(fb: FormGroup) {
    let ConfrimPswrdCtrl = fb.get('chcekPasswd');
    //passwordMismatch
    if (ConfrimPswrdCtrl.errors == null || 'passwordMismatch' in ConfrimPswrdCtrl.errors) {
      if (fb.get('passwd').value != ConfrimPswrdCtrl.value)
        ConfrimPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        ConfrimPswrdCtrl.setErrors(null);
    }
  }

  saveModyfied() {
    var body = {
      UserName: this.userDataForm.value.userName,
      Email: this.userDataForm.value.email,
      FullName: this.userDataForm.value.fullname,
      Password: this.userDataForm.value.passwd
    };
    this.serviceDetails.updateUser(body).toPromise();
    this.router.navigateByUrl('/profile');
  }
 
}
