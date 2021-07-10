import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  isAdmin = false;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURL = 'https://localhost:44326/api';

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

  getUserProfile() {
    return this.http.get(this.BaseURL + '/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  roleMatchSingle(allowedRole): boolean{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    if(userRole == allowedRole){
      return true;
    }
    return false;
  }
}
