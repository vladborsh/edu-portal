import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { Institute } from '../../../models/instutute.model';
import { UserStoreService } from '../../../commons/services/user-store.service';
import { Observable, forkJoin } from 'rxjs';
import { Group } from '../../../models/group.model';
import { InstituteStoreService } from '../../../commons/services/institute-store.service';
import { concat } from 'rxjs/operators';
import { ResponseModel } from '../../../models/response.model';

@Component({ 
  selector: 'app-import-users',
  templateUrl: './import-users.component.html',
  styleUrls: ['./import-users.component.scss']
})
export class ImportUsersComponent implements OnInit {

  @Input() items: User[];

  constructor(
    private activeModal: NgbActiveModal,
    private userStore: UserStoreService,
  ) { }

  ngOnInit() {}

  public submit() {
    forkJoin(this.items.map((user: User): Observable<ResponseModel<User>> => {
      user.role = 'Student';
      user.course = 'I курс';
      console.log(user);
      return this.userStore.add(user)
    }))
    .subscribe((responses: ResponseModel<User>[]) => {
        console.log(responses)
        this.activeModal.close()
        // if (res.success) {
        // } else {
        //   this.alert = res.message;
        // }
      });
  }

}

