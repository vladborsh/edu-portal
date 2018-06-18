import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SpecialityStoreService } from '../../../commons/services/speciality-store.service';
import { Speciality } from '../../../models/speciality.model';
import { InstituteStoreService } from '../../../commons/services/institute-store.service';

@Component({
  selector: 'app-new-speciality',
  templateUrl: './new-speciality.component.html',
  styleUrls: ['./new-speciality.component.scss']
})
export class NewSpecialityComponent implements OnInit {

  public newSpecialityForm: FormGroup;
  public speciality: Speciality;
  public institutes$: Observable<Speciality[]>;
  public alert: string;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private instituteStore: InstituteStoreService,
    private specialityStore: SpecialityStoreService,
  ) { }

  ngOnInit() {
    this.speciality = {}
    this.newSpecialityForm = this.fb.group({
      'title' : ['', Validators.required],
      'description' : ['', Validators.required],
    })
    this.institutes$ = this.instituteStore.getData();
  }

  public selectInstitute(instituteTitle: string) {
    this.speciality.institute = instituteTitle;
  }

  public submit() {
    this.specialityStore.add(this.speciality)
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


