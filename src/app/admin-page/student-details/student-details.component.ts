import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { switchMap, take } from 'rxjs/operators';
import { UserStoreService } from '../../commons/services/user-store.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  
  public student$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
    this.student$ = this.userStore.getStudents()
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
