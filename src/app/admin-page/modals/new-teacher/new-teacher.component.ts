import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { Institute } from '../../../models/instutute.model';
import { UserStoreService } from '../../../commons/services/user-store.service';
import { Observable } from 'rxjs';
import { Group } from '../../../models/group.model';
import { InstituteStoreService } from '../../../commons/services/institute-store.service';
import { SpecialityStoreService } from '../../../commons/services/speciality-store.service';
import { Speciality } from '../../../models/speciality.model';


@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.scss']
})
export class NewTeacherComponent implements OnInit {

  
  public newTeacherForm: FormGroup;
  public teacher: User;
  public institutes$: Observable<Institute[]>;
  public specialities$: Observable<Speciality[]>;
  public alert: string;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userStore: UserStoreService,
    private instituteStore: InstituteStoreService,
    private specilaityStore: SpecialityStoreService,
  ) { }

  ngOnInit() {
    this.teacher = {
      educationForm: 'Дневная форма обучения',
      isBudget: true,
    }
    this.newTeacherForm = this.fb.group({
      'name' : ['', Validators.required],
      'email' : ['', Validators.required],
      'birthdate' : ['', Validators.required],
      'address' : ['', Validators.required],
      'position' : ['', Validators.required],
    })
    this.institutes$ = this.instituteStore.getData();
    this.specialities$ = this.specilaityStore.getData();
  }

  public selectInstitute(institute: Institute) {
    this.teacher.institute = institute.title;
  }

  public selectSpeciality(speciality: Speciality) {
    this.teacher.speciality = speciality.title;
  }

  public submit() {
    this.teacher.birthdate = this.convertDate(this.teacher.birthdate);
    this.teacher.role = 'Teacher';
    this.userStore.add(this.teacher)
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

