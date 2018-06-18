import { Component, OnInit, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { NewStudentComponent } from '../modals/new-student/new-student.component';
import { RemoveStudentComponent } from '../modals/remove-student/remove-student.component';
import { Institute } from '../../models/instutute.model';
import { UserStoreService } from '../../commons/services/user-store.service';
import { filter, map } from 'rxjs/operators';
import { Speciality } from '../../models/speciality.model';
import { SpecialityStoreService } from '../../commons/services/speciality-store.service';
import { InstituteStoreService } from '../../commons/services/institute-store.service';
import { RemoveTeacherComponent } from '../modals/remove-teacher/remove-teacher.component';
import { NewTeacherComponent } from '../modals/new-teacher/new-teacher.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  public teachers$: Observable<User[]>;
  public specialities$: Observable<Speciality[]>;
  public institutes$: Observable<Speciality[]>;
  public specialityFilter: string;
  public instituteFilter: string;

  constructor(
    private modalService: NgbModal,
    private userStore: UserStoreService,
    private specialityStore: SpecialityStoreService,
    private instituteStore: InstituteStoreService,
  ) { }

  ngOnInit() {
    this.teachers$ = this.userStore.getTeachers();
    this.specialities$ = this.specialityStore.getData();
    this.institutes$ = this.instituteStore.getData();
    this.userStore.update();
    this.specialityStore.update();
    this.instituteStore.update();
  }

  add() {
    const modalRef = this.modalService.open(NewTeacherComponent);
  }

  remove(item) {
    const modalRef = this.modalService.open(RemoveTeacherComponent);
    modalRef.componentInstance.item = item;
  }

  filterSpeciality( speciality: string) {
    this.specialityFilter = speciality;
  }

  filterInstitute( institute: string) {
    this.instituteFilter = institute
  }

}

@Pipe({
  name: 'filterTeachers',
  pure: false
})
export class FilterTeachers implements PipeTransform {
  transform(items: User[], filter: User): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item =>
      (filter.speciality ? (item.speciality === filter.speciality) : true) &&
      (filter.course ? (item.course === filter.course) : true)
    );
  }
}
