import { Component, OnInit, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Speciality } from '../../models/speciality.model';
import { SpecialityStoreService } from '../../commons/services/speciality-store.service';
import { Subject } from '../../models/subject.model';
import { Group } from '../../models/group.model';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { GroupStoreService } from '../../commons/services/group-store.service';
import { NewSubjectComponent } from '../modals/new-subject/new-subject.component';
import { RemoveSubjectComponent } from '../modals/remove-subject/remove-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public subjects$: Observable<Subject[]>;
  public specialities$: Observable<Speciality[]>;
  public groups$: Observable<Group[]>;
  public specialityFilter: string;
  public groupFilter: string;

  constructor(
    private modalService: NgbModal,
    private subjectStore: SubjectStoreService,
    private specialityStore: SpecialityStoreService,
    private groupStore: GroupStoreService
  ) { }

  ngOnInit() {
    this.subjects$ = this.subjectStore.getData();
    this.specialities$ = this.specialityStore.getData();
    this.groups$ = this.groupStore.getData();
  }

  add() {
    const modalRef = this.modalService.open(NewSubjectComponent);
  }

  remove(item) {
    const modalRef = this.modalService.open(RemoveSubjectComponent);
    modalRef.componentInstance.item = item;
  }

  filterSpeciality( speciality: string ) {
    this.specialityFilter = speciality;
  }

  filterGroup( group: string) {
    this.groupFilter = group;
  }

}

@Pipe({
  name: 'filterSubjects',
  pure: false
})
export class FilterSubjects implements PipeTransform {
  transform(items: Subject[], filter: Subject): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => 
      (filter.title ? this.match(item.title,filter.title) : true) &&
      (filter.speciality ? this.match(item.speciality, filter.speciality) : true) &&
      (filter.group ? this.match(item.group,filter.group) : true)  
    );
  }

  match( copmparedValue, value ) {
    if (!copmparedValue) return false;
    return copmparedValue.toLowerCase().indexOf(value.toLowerCase()) != -1
  }
}
