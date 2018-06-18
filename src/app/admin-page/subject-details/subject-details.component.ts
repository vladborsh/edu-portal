import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
  
  public subject$: Observable<Subject>;

  constructor(
    private route: ActivatedRoute,
    private subjectStore: SubjectStoreService
  ) { }

  ngOnInit() {
    this.subject$ = this.subjectStore.getData()
      .pipe(
        switchMap( (subjects:Subject[]) => new Observable(
          (observer) =>
            this.route.params.pipe(
              take(1)
            )
            .subscribe( params => observer.next( subjects.find( (subject: Subject) => subject._id === params['id'])))
        ))
      )
  }

}

