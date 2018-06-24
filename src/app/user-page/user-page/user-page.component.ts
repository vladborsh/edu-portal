import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject.model';
import { AuthStoreService, AuthStoreModel } from '../../auth/services/auth-store.service';
import { UserStoreService } from '../../commons/services/user-store.service';
import { tap, switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public user$: Observable<User>;

  constructor(
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
    this.user$ = this.userStore.getDetails();
  }

}
