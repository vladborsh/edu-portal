import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscriber, Subscription, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { switchMap, take } from 'rxjs/operators';
import { UserStoreService } from '../../commons/services/user-store.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  
  public teacher$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
    this.teacher$ = this.userStore.getTeachers()
      .pipe(
        switchMap( (users:User[]) => new Observable(
          (observer) =>
            this.route.params.pipe(
              take(1)
            )
            .subscribe( params => observer.next( users.find( (user) => user._id === params['id'])))
        ))
      )
  }

}
