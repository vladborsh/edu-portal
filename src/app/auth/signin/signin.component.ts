import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { BackendService } from '../../commons/backend.service';
import { User } from '../../models/user.model';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthModel } from '../../models/auth.model';

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
    private backend: BackendService) { 
    }

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
        data => this.processUthorization(data),
        error => console.error(error)
      );
  }

  processUthorization(data) {
    console.log(data);
    localStorage.setItem('token', data.token);
    this.router.navigate(['../../admin']);
  }

}
