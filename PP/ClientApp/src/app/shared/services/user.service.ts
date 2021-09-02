import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn = false;
  public isAdmin = false;
  public isBibliotekarz = false;  
  readonly BaseURL = 'https://localhost:44326/api';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfrimPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let ConfrimPswrdCtrl = fb.get('ConfrimPassword');
    //passwordMismatch
    if (ConfrimPswrdCtrl.errors == null || 'passwordMismatch' in ConfrimPswrdCtrl.errors) {
      if (fb.get('Password').value != ConfrimPswrdCtrl.value)
        ConfrimPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        ConfrimPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURL + '/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURL + '/ApplicationUser/Login', formData);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(this.BaseURL + '/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var bool = false;
    if (localStorage.getItem('token') !== null) {
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;
      allowedRoles.forEach(element => {
        if (userRole === element) {
          bool = true;
        }
      });
    }
    return bool;
  }

  roleMatchSingle(allowedRole): boolean {
    if (localStorage.getItem('token') !== null) {
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;
      if (userRole == allowedRole) {
        return true;
      }
    }
    else this.isLoggedIn = false;
    return false;
  }

  getUserDetails(id: String)
  {
    return this.http.get<User>(this.BaseURL+'/ApplicationUser/'+id);
  }
}
