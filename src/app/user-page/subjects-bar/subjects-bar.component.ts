import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStoreService, AuthStoreModel } from '../../auth/services/auth-store.service';
import { Subject } from '../../models/subject.model';
import { UserStoreService } from '../../commons/services/user-store.service';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { User } from '../../models/user.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-subjects-bar',
  templateUrl: './subjects-bar.component.html',
  styleUrls: ['./subjects-bar.component.scss']
})
export class SubjectsBarComponent implements OnInit {

  public subjects$: Observable<Subject[]>;

  constructor(
    private userStore: UserStoreService,
    private subjectStore: SubjectStoreService
  ) { }

  ngOnInit() {
    this.subjects$ = this.userStore.getDetails()
      .pipe(
        switchMap((user: User) => this.subjectStore.getData(user))
      )
  }

}
