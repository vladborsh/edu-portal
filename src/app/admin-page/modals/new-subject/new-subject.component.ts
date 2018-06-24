import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Group } from '../../../models/group.model';
import { Subject } from '../../../models/subject.model';
import { SpecialityStoreService } from '../../../commons/services/speciality-store.service';
import { GroupStoreService } from '../../../commons/services/group-store.service';
import { Speciality } from '../../../models/speciality.model';
import { SubjectStoreService } from '../../../commons/services/subject-store.service';
import { User } from '../../../models/user.model';
import { UserStoreService } from '../../../commons/services/user-store.service';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {

  @Input() inputGroup: Group;

  public newSubjectForm: FormGroup;
  public subject: Subject;
  public specialites$: Observable<Speciality[]>;
  public groups$: Observable<Group[]>;
  public teachers$: Observable<User[]>;
  public alert: string;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private subjectStore: SubjectStoreService,
    private specialityStore: SpecialityStoreService,
    private groupStore: GroupStoreService,
    private userStore: UserStoreService,
  ) { }

  ngOnInit() {
    this.subject = {}
    if (this.inputGroup) {
      this.subject.group = this.inputGroup.title;
      this.subject._group = this.inputGroup._id;
      this.subject.speciality = this.inputGroup.speciality;
    }
    this.newSubjectForm = this.fb.group({
      'title' : ['', Validators.required],
      'description' : ['',],
    })
    this.specialites$ = this.specialityStore.getData();
    this.teachers$ = this.specialityStore.getData();
    this.groups$ = this.groupStore.getData();
    this.teachers$ = this.userStore.getTeachers();
  }

  public selectSpeciality(specialityTitle: string) {
    this.subject.speciality = specialityTitle;
  }

  public selectGroup(group: Group) {
    this.subject.group = group.title;
    this.subject._group = group._id;
  }
  
  public selectTeacher(teacher: User) {
    this.subject._teacher = teacher._id;
    this.subject.teacherName = teacher.name;
  }

  public submit() {
    this.subjectStore.add(this.subject)
      .subscribe((res) => {
        if (res.success) {
          this.activeModal.close()
        } else {
          this.alert = res.message;
        }
      });
  }

  public convertDate(date) {
    return new Date(date.year, date.month, date.day).toISOString();
  }

  public closeAlert() {
    this.alert = null;
  }

}

