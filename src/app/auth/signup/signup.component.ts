import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BackendService } from '../../commons/backend.service';
import { ResponseModel } from '../../models/response.model';
import { User } from '../../models/user.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthStoreService } from '../services/auth-store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public verifySignUnForm: FormGroup;
  public setPasswordForm: FormGroup;
  public verified: boolean;
  public email: string;
  public verificationCode: string;

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private router: Router,
    private authStore: AuthStoreService
  ) { }

  ngOnInit() {
    this.verified = false;
    this.verifySignUnForm = this.fb.group({
      'email' : ['', Validators.required],
      'verificationCode' : ['', Validators.required],
    });
    this.setPasswordForm = this.fb.group({
      'password' : ['', Validators.required],
      'approvePassword' : ['', Validators.required],
    });
  }

  public verify() {
    this.authStore.setData({alert: null})
    this.backend.post<User,ResponseModel<User>>('user/verify', 
    {
      email : this.verifySignUnForm.controls.email.value,
      verificationCode : this.verifySignUnForm.controls.verificationCode.value,
    })
    .subscribe(
      data => {
        if (data.success) {
            this.verified = true
          } else {
            this.authStore.setData({
              alert: { message: data.message, type: 'warning' }
            })
          }
        },
        error => console.error(error)
      );
  }

  public setPassword() {
    this.authStore.setData({alert: null})
    if (this.setPasswordForm.controls.password.value === this.setPasswordForm.controls.approvePassword.value) {
      this.backend.post<User,ResponseModel<User>>('user/setpass', 
        {
          password : this.setPasswordForm.controls.password.value,
          verificationCode : this.verificationCode,
          email: this.email
        })
        .subscribe(
          data => {
            if (data.success) {
              this.router.navigate(['auth/signin']);
              this.authStore.setData({
                alert: { message: 'Вы активировали пользователя! Можете войти', type: 'info' }
              })
            } else {
              this.authStore.setData({
                alert: { message: data.message, type: 'warning' }
              })
            }
          },
          error => console.error(error)
        );
    } else {
      this.authStore.setData({
        alert: { message: 'Пароли не совпадают', type: 'warning' }
      })
    }
  }
}
