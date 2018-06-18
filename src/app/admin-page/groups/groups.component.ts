import { Component, OnInit, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Speciality } from '../../models/speciality.model';
import { SpecialityStoreService } from '../../commons/services/speciality-store.service';
import { Subject } from '../../models/subject.model';
import { Group } from '../../models/group.model';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { NewSubjectComponent } from '../modals/new-subject/new-subject.component';
import { RemoveSubjectComponent } from '../modals/remove-subject/remove-subject.component';
import { InstituteStoreService } from '../../commons/services/institute-store.service';
import { GroupStoreService } from '../../commons/services/group-store.service';
import { NewGroupComponent } from '../modals/new-group/new-group.component';
import { RemoveGroupComponent } from '../modals/remove-group/remove-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groups$: Observable<Group[]>;
  public specialities$: Observable<Speciality[]>;
  public institutes$: Observable<Speciality[]>;
  public specialityFilter: string;
  public instituteFilter: string;

  constructor(
    private modalService: NgbModal,
    private groupStore: GroupStoreService,
    private specialityStore: SpecialityStoreService,
    private instituteStore: InstituteStoreService
  ) { }

  ngOnInit() {
    this.groups$ = this.groupStore.getData();
    this.specialities$ = this.specialityStore.getData();
    this.institutes$ = this.instituteStore.getData();
  }

  add() {
    const modalRef = this.modalService.open(NewGroupComponent);
  }

  remove(item) {
    const modalRef = this.modalService.open(RemoveGroupComponent);
    modalRef.componentInstance.item = item;
  }

  filterSpeciality( specialityTitle: string ) {
    this.specialityFilter = specialityTitle;
  }

  filterInstitute( groupTitle: string) {
    this.instituteFilter = groupTitle;
  }

}

@Pipe({
  name: 'filterGroups',
  pure: false
})
export class FilterGroups implements PipeTransform {
  transform(items: Group[], filter: Group): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => 
      (filter.title ? this.match(item.title, filter.title) : true) &&
      (filter.speciality ? this.match(item.speciality, filter.speciality) : true) &&
      (filter.institute ? this.match(item.institute, filter.institute) : true)  
    );
  }

  match( copmparedValue, value ) {
    if (!copmparedValue) return false;
    return copmparedValue.toLowerCase().indexOf(value.toLowerCase()) != -1
  }
}

