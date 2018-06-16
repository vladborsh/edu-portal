import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signInForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      'name' : ['', Validators.required],
      'password' : ['', Validators.required],
    });
  }

  signin() {}

}
