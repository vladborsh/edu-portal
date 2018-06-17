import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { Institute } from '../../../models/instutute.model';
import { UserStoreService } from '../../../commons/services/user-store.service';
import { Observable } from 'rxjs';
import { Group } from '../../../models/group.model';
import { InstituteStoreService } from '../../../commons/services/institute-store.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  public newStudentForm: FormGroup;
  public student: User;
  public institute: Institute;
  public institutes$: Observable<Institute[]>;
  public alert: string;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userStore: UserStoreService,
    private instituteStore: InstituteStoreService,
  ) { }

  ngOnInit() {
    this.institute = {groups: []};
    this.student = {
      educationForm: 'Дневная форма обучения',
      isBudget: true,
    }
    this.newStudentForm = this.fb.group({
      'name' : ['', Validators.required],
      'email' : ['', Validators.required],
      'birthdate' : ['', Validators.required],
      'address' : ['', Validators.required],
      'admissionDate' : ['', Validators.required],
    })
    this.institutes$ = this.instituteStore.getData();
  }

  public selectInstitute(institute) {
    this.institute = institute;
    this.student.institute = institute.title;
  }

  public selectGroup(group) {
    this.student.group = group.title;
  }

  public submit() {
    this.student.birthdate = this.convertDate(this.student.birthdate);
    this.student.admissionDate = this.convertDate(this.student.admissionDate);
    this.student.role = 'Student';
    this.userStore.addStudent(this.student)
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
