import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscriber, interval } from 'rxjs';
import { switchMap, take, filter, last, map, tap, distinctUntilChanged, share } from 'rxjs/operators';
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
  public group: Group;

  constructor(
    private route: ActivatedRoute,
    private subjectStore: SubjectStoreService,
    private groupStore: GroupStoreService,
    private userStore: UserStoreService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.group$ =this.route.params
        .pipe(
          map((params: Params) => params.id),
          switchMap((id: string) => this.groupStore.getDataDetails(id)),
          tap((group: Group)=> this.fillChildObjects(group)),
          tap((group: Group)=> this.group = group),
          share()
        );
  }

  fillChildObjects(group: Group) {
    this.students$ = this.userStore.getStudents()
      .pipe( 
        map((users: User[]) => users.filter( (user: User) => user.group === group.title ) )
      );
    this.subjects$ = this.subjectStore.getData()
      .pipe( 
        map((subjects: Subject[]) => subjects.filter( (subject: Subject) => subject.group === group.title ) )
      );
  }

  addStudent() {
    const modalRef = this.modalService.open(NewStudentComponent);
    modalRef.componentInstance.inputGroup = this.group;
    modalRef.result.then(() => this.groupStore.getDataDetails(this.group._id))
  }

  removeStudent(item) {
    const modalRef = this.modalService.open(RemoveStudentComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(() => this.groupStore.getDataDetails(this.group._id))
  }

  addSubject() {
    const modalRef = this.modalService.open(NewSubjectComponent);
    modalRef.componentInstance.inputGroup = this.group;
  }

  removeSubject(item) {
    const modalRef = this.modalService.open(RemoveSubjectComponent);
    modalRef.componentInstance.item = item;
  }

}

