import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { BackendService } from '../../commons/backend.service';
import { User } from '../../models/user.model';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthModel } from '../../models/auth.model';
import { AuthStoreService } from '../services/auth-store.service';
import { UserStoreService } from '../../commons/services/user-store.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backend: BackendService,
    private authStore: AuthStoreService,
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email : ['v.borsh.io@gmail.com', Validators.required],
      password : ['admin', Validators.required],
    });
  }

  signin() {
    if (this.signInForm.invalid) {
      return;
    }
    this.backend.post<User,AuthModel>('user/auth', 
      {
        email : this.signInForm.controls.email.value,
        password : this.signInForm.controls.password.value,
      })
      .subscribe(
        data => this.processAuthorization(data),
        error => console.error(error)
      );
  }

  processAuthorization(data: AuthModel) : void {
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('uid', data.id);
      this.userStore.getDetails(data.id)
        .subscribe(
          (user: User) => {
            console.log(user)
            if (user.role === 'Admin') this.router.navigate(['../../admin']);
            else this.router.navigate(['../../user']);
          }
        )
    } else {
      this.authStore.setData({
        alert: { message: data.message, type: 'warning' }
      })
    }
  }

}
