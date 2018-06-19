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
import { InstituteStoreService } from '../../../commons/services/institute-store.service';
import { Institute } from '../../../models/instutute.model';
import { ResponseModel } from '../../../models/response.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  public newGroupForm: FormGroup;
  public group: Group;
  public specialites$: Observable<Speciality[]>;
  public institutes$: Observable<Institute[]>;
  public institute: Institute;
  public speciality: Speciality;
  public alert: string;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private instituteStore: InstituteStoreService,
    private specialityStore: SpecialityStoreService,
    private groupStore: GroupStoreService,
  ) { }

  ngOnInit() {
    this.group = {}
    this.newGroupForm = this.fb.group({
      'title' : ['', Validators.required],
    })
    this.specialites$ = this.specialityStore.getData();
    this.institutes$ = this.instituteStore.getData();

  }

  public selectSpeciality(speciality: Speciality) {
    this.speciality = speciality;
    this.group.speciality = speciality.title;
    this.calculateGroupTitle()
  }

  public selectInstitute(institute: Institute) {
    this.institute = institute;
    this.group.institute = institute.title;
  }

  public calculateGroupTitle() {
    let numPart = new Date().getFullYear().toString().substring(2,4);
    let numPart2 = (Date.now()+'').substring(8,10);
    this.group.title = `${this.speciality.groupNaming}-${numPart}${numPart2}`;
  }

  public submit() {
    this.groupStore.add(this.group)
      .subscribe((res: ResponseModel<Group>) => {
        if (res.success) {
          this.institute.groups.push(res.item);
          this.instituteStore.updateItem(this.institute)
            .subscribe(
              (res: ResponseModel<Institute>) => {
                if (res.success) {
                  this.activeModal.close()
                } else {
                  this.alert = res.message;
                }
              }
            )
        } else {
          this.alert = res.message;
        }
      });
  }

  public closeAlert() {
    this.alert = null;
  }

}

