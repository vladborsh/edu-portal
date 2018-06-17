import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUnForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signUnForm = this.fb.group({
      'name' : ['', Validators.required],
      'password' : ['', Validators.required],
    });
  }

  signup() {}
}
