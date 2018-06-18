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

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  public students$: Observable<User[]>;
  public specialities$: Observable<Speciality[]>;
  public specialityFilter: string;
  public courseFilter: string;
  public courses: string[];

  constructor(
    private modalService: NgbModal,
    private userStore: UserStoreService,
    private specialityStore: SpecialityStoreService,
  ) { }

  ngOnInit() {
    this.students$ = this.userStore.getStudents();
    this.specialities$ = this.specialityStore.getData();
    this.userStore.update();
    this.specialityStore.update();
    this.courses = ['I курс', 'II курс', 'III курс', 'IV курс', 'V курс', 'IVI курс',]
  }

  add() {
    const modalRef = this.modalService.open(NewStudentComponent);
  }

  remove(item) {
    const modalRef = this.modalService.open(RemoveStudentComponent);
    modalRef.componentInstance.item = item;
  }

  filterSpeciality( speciality: string) {
    this.specialityFilter = speciality;
  }

  filterCourse( course: string) {
    this.courseFilter = course;
  }

}

@Pipe({
  name: 'filterStudents',
  pure: false
})
export class FilterStudents implements PipeTransform {
  transform(items: User[], filter: User): any {
    if (!items || !filter) {
      return items;
    }
    console.log(filter)
    return items.filter(item => 
      (filter.name ? this.match(item.name,filter.name) : true) &&
      (filter.speciality ? this.match(item.speciality, filter.speciality) : true) &&
      (filter.course ? this.match(item.course,filter.course) : true)  
    );
  }

  match( copmparedValue, value ) {
    if (!copmparedValue) return false;
    return copmparedValue.toLowerCase().indexOf(value.toLowerCase()) != -1
  }
}
