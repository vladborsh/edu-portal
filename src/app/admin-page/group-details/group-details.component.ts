import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscriber, interval } from 'rxjs';
import { switchMap, take, filter, last, map, tap, distinctUntilChanged, share } from 'rxjs/operators';
import { GroupStoreService } from '../../commons/services/group-store.service';
import { Group, Journal, Mark } from '../../models/group.model';
import { User } from '../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreService } from '../../commons/services/user-store.service';
import { NewStudentComponent } from '../modals/new-student/new-student.component';
import { RemoveStudentComponent } from '../modals/remove-student/remove-student.component';
import { Subject } from '../../models/subject.model';
import { SubjectStoreService } from '../../commons/services/subject-store.service';
import { NewSubjectComponent } from '../modals/new-subject/new-subject.component';
import { RemoveSubjectComponent } from '../modals/remove-subject/remove-subject.component';
import { Scheduling } from '../../models/schedule.model';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  
  public group$: Observable<Group>;
  public subjects$: Observable<Subject[]>;
  public students$: Observable<User[]>;
  public scheduling$: Observable<Scheduling[]>;
  public group: Group;
  public schedulingTable: [[string]];

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
          filter((group:Group) => group._id !== undefined),
          tap((group: Group)=> {
            this.group = group;
            console.log(group)
            this.fillChildObjects(group)
          }),
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
    this.groupStore.getSchedulingData(group)
      .pipe(
        tap( value => console.log(value)),
        map( (items: Scheduling[]) => this.getShedulingTable(items) ),
        share(),
      )
      .subscribe(
        (items: [[string]]) => this.schedulingTable = items
      )
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
    modalRef.result.then(() => this.groupStore.getDataDetails(this.group._id))
  }

  removeSubject(item) {
    const modalRef = this.modalService.open(RemoveSubjectComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(() => this.groupStore.getDataDetails(this.group._id))
  }

  addMarksRow(journal: Journal) {
    this.groupStore.extendJournal(journal)
      .pipe(
        switchMap(
          () => this.groupStore.getDataDetails(this.group._id).pipe(
            take(1)
          )
        ),
        take(1)
      )
      .subscribe()
  }

  selectDate(journal: Journal, index: number, event: any) {
    journal.marksDate[index] = event.target.value;
    this.groupStore.setJournalMarksDate(journal)
      .pipe(
        switchMap(
          () => this.groupStore.getDataDetails(this.group._id).pipe(
            take(1)
          )
        ),
        take(1)
      )
      .subscribe()
  }

  changeMark(mark: Mark) {
    this.groupStore.changeMark(mark).pipe(take(1)).subscribe()
  }

  scheduleSubject(subject: Subject, orderIndex: number, dayOfWeekIndex: number) {
    this.groupStore.scheduleSubject(
      this.group,
      {
        _group: this.group._id,
        _subject: subject._id,
        weekDay: dayOfWeekIndex,
        orderNumber: orderIndex,
      })
      .pipe(take(1));
  }

  getShedulingTable(items: Scheduling[]): any {
    const table = [];
    [1,2,3,4,5].forEach( item => 
      table.push(['','','','',''])
    )
    items.forEach( (item:Scheduling) => table[item.orderNumber][item.weekDay] = 
      item._subject 
        ? (<Subject>item._subject).title
        : '')
    return table;
  }
}

