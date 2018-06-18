import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { Subject } from '../../models/subject.model';
import { SpecialityStoreService } from '../../commons/services/speciality-store.service';
import { Speciality } from '../../models/speciality.model';

@Component({
  selector: 'app-speciality-details',
  templateUrl: './speciality-details.component.html',
  styleUrls: ['./speciality-details.component.scss']
})
export class SpecialityDetailsComponent implements OnInit {
  
  public speciality$: Observable<Speciality>;

  constructor(
    private route: ActivatedRoute,
    private specialityStore: SpecialityStoreService
  ) { }

  ngOnInit() {
    this.speciality$ = this.specialityStore.getData()
      .pipe(
        switchMap( (subjects:Subject[]) => new Observable<Speciality>(
          (observer) =>
            this.route.params.pipe(
              take(1)
            )
            .subscribe( params => observer.next( subjects.find( (speciality: Speciality) => speciality._id === params['id'])))
        ))
      )
  }

}


