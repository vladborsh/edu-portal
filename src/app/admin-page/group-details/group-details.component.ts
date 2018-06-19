import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take, filter, last, map, tap } from 'rxjs/operators';
import { GroupStoreService } from '../../commons/services/group-store.service';
import { Group } from '../../models/group.model';
import { User } from '../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreService } from '../../commons/services/user-store.service';
import { NewStudentComponent } from '../modals/new-student/new-student.component';
import { RemoveStudentComponent } from '../modals/remove-student/remove-student.component';
import { Subject } from '../../models/subject.model';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { NewSubjectComponent } from '../modals/new-subject/new-subject.component';
import { RemoveSubjectComponent } from '../modals/remove-subject/remove-subject.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  
  public group$: Observable<Group>;
  public subjects$: Observable<Subject[]>;
  public students$: Observable<User[]>;

  constructor(
    private route: ActivatedRoute,
    private subjectStore: SubjectStoreService,
    private groupStore: GroupStoreService,
    private userStore: UserStoreService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.group$ = this.groupStore.getData()
      .pipe( 
        switchMap( (groups: Group[]) => new Observable(
          (observer) =>
            this.route.params.pipe(
              take(1)
            )
            .subscribe( params => observer.next( groups.find( (group: Group) => group._id === params['id'])))
        ))
      )
    this.students$ = this.userStore.getStudents()
      .pipe( 
        switchMap( (users: User[]) => 
          this.group$
            .pipe(
              map( (group: Group) => users.filter( (user: User) => user.group === group.title ) )
            )
        )
      );
    this.subjects$ = this.subjectStore.getData()
      .pipe( 
        switchMap( (subjects: Subject[]) => 
          this.group$
            .pipe(
              map( (group: Group) => subjects.filter( (subject: Subject) => subject.group === group.title ) )
            )
        )
      );
  }

  addStudent() {
    this.group$
      .pipe(
        take(1)
      )
      .subscribe(
        (group: Group) => {
          const modalRef = this.modalService.open(NewStudentComponent);
          modalRef.componentInstance.inputGroup = group;
        }
      )
  }

  removeStudent(item) {
    const modalRef = this.modalService.open(RemoveStudentComponent);
    modalRef.componentInstance.item = item;
  }

  addSubject() {
    this.group$
      .pipe(
        take(1)
      )
      .subscribe(
        (group: Group) => {
          const modalRef = this.modalService.open(NewSubjectComponent);
          modalRef.componentInstance.inputGroup = group;
        }
      )
  }

  removeSubject(item) {
    const modalRef = this.modalService.open(RemoveSubjectComponent);
    modalRef.componentInstance.item = item;
  }

}

