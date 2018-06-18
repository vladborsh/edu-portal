import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Group } from '../../../models/group.model';
import { Subject } from '../../../models/subject.model';
import { SpecialityStoreService } from '../../../commons/services/speciality-store.service';
import { GroupStoreService } from '../../../commons/services/group-store.service';
import { Speciality } from '../../../models/speciality.model';
import { SubjectStoreService } from '../../../commons/services/subject-store.service';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {

  public newSubjectForm: FormGroup;
  public subject: Subject;
  public specialites$: Observable<Speciality[]>;
  public groups$: Observable<Group[]>;
  public alert: string;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private subjectStore: SubjectStoreService,
    private specialityStore: SpecialityStoreService,
    private groupStore: GroupStoreService,
  ) { }

  ngOnInit() {
    this.subject = {}
    this.newSubjectForm = this.fb.group({
      'title' : ['', Validators.required],
      'description' : ['', Validators.required],
    })
    this.specialites$ = this.specialityStore.getData();
    this.groups$ = this.groupStore.getData();
  }

  public selectSpeciality(specialityTitle: string) {
    this.subject.speciality = specialityTitle;
  }

  public selectGroup(groupTitle: string) {
    this.subject.group = groupTitle;
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

