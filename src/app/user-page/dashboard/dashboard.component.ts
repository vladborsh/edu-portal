import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../commons/services/user-store.service';
import { switchMap, map } from 'rxjs/operators';
import { GroupStoreService } from '../../commons/services/group-store.service';
import { User } from '../../models/user.model';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userStore: UserStoreService,
    private groupStore: GroupStoreService
  ) {}

  ngOnInit() {
    this.userStore.getDetails()
      .pipe(
        switchMap((user: User) => this.groupStore.getData(user._id)),
        map((groups: Group[]) => console.log(groups))
      )
  }

}
