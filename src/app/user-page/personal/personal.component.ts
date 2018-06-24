import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../commons/services/user-store.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public user$: Observable<User>;

  constructor(
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
    this.user$ = this.userStore.getDetails();
  }

}
