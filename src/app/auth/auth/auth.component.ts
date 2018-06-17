import { Component, OnInit } from '@angular/core';
import { AuthStoreService, AuthStoreModel } from '../services/auth-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authStoreModel$: Observable<AuthStoreModel>
  public alert: {};

  constructor(private authStore: AuthStoreService) { }

  ngOnInit() {
    this.authStoreModel$ = this.authStore.getData();
    this.authStoreModel$
      .subscribe( (authStoreModel: AuthStoreModel ) => this.alert = authStoreModel.alert );
  }

  closeAlert() {
    this.authStore.setData({alert: null})
  }

}
