import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../commons/services/user-store.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { GroupStoreService } from '../../commons/services/group-store.service';
import { User } from '../../models/user.model';
import { Group } from '../../models/group.model';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userStore: UserStoreService,
    private groupStore: GroupStoreService,
    private subjectStore: SubjectStoreService,
  ) {}

  ngOnInit() {
    this.userStore.getDetails()
      .pipe(
        tap(data => console.log(data)),
        switchMap((user: User) => this.subjectStore.getData(user)),
        map((subjects: Subject[]) => console.log(subjects))
      )
      .subscribe(
        
      )
  }

}
