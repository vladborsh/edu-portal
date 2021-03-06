import { Component, OnInit, ChangeDetectorRef, Pipe, PipeTransform, ElementRef, ViewChild, Renderer } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, fromEvent } from 'rxjs';
import { User } from '../../models/user.model';
import { NewStudentComponent } from '../modals/new-student/new-student.component';
import { RemoveStudentComponent } from '../modals/remove-student/remove-student.component';
import { Institute } from '../../models/instutute.model';
import { UserStoreService } from '../../commons/services/user-store.service';
import { filter, map, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Speciality } from '../../models/speciality.model';
import { SpecialityStoreService } from '../../commons/services/speciality-store.service';
import { FormControl } from '@angular/forms';
import { CsvConverterService } from '../services/csv-converter.service';
import { ImportUsersComponent } from '../modals/import-users/import-users.component';

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
  public importStudentsFileName: string;
  @ViewChild('csvFileInput') csvFileInput: ElementRef;
  public importedStudents: User[];

  constructor(
    private modalService: NgbModal,
    private userStore: UserStoreService,
    private specialityStore: SpecialityStoreService,
    private csvConverter: CsvConverterService,
    private renderer:Renderer
  ) { }

  ngOnInit() {
    this.students$ = this.userStore.getStudents();
    this.specialities$ = this.specialityStore.getData();
    this.courses = ['I курс', 'II курс', 'III курс', 'IV курс', 'V курс', 'IVI курс',]
  }

  handleStudentCsv(event) {
    const reader = new FileReader();
    new Observable( (observer) => { reader.onload = observer.next.bind(observer) } )
      .pipe(
        map( (event: Event) => reader.result )
      ).subscribe( value => this.importedStudents = this.csvConverter.csvJSON(value) )
    reader.readAsText(event.target.files[0]);
    this.importStudentsFileName = event.target.files[0].name;
  }

  dispatch() {
    this.renderer.invokeElementMethod(
      this.csvFileInput.nativeElement, 'dispatchEvent', [new MouseEvent('click', {bubbles: true})]
    );
  }

  importStudents() {
    const modalRef = this.modalService.open(ImportUsersComponent);
    modalRef.result
      .then((result) => {
        this.importedStudents = null;
        this.csvFileInput.nativeElement.value = null;
        this.importStudentsFileName = null;
      });
    modalRef.componentInstance.items = this.importedStudents;
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
