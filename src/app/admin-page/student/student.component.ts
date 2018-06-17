import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { NewStudentComponent } from '../modals/new-student/new-student.component';
import { RemoveStudentComponent } from '../modals/remove-student/remove-student.component';
import { Institute } from '../../models/instutute.model';
import { UserStoreService } from '../../commons/services/user-store.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  public students$ : Observable<User[]>;
  public institute: Institute;

  constructor(
    private modalService: NgbModal,
    private userStore: UserStoreService,
  ) { }

  ngOnInit() {
    this.institute = {groups: []};
    this.userStore.updateStudents();
    this.students$ = this.userStore.getStudents();
  }

  add() {
    const modalRef = this.modalService.open(NewStudentComponent);
  }

  remove(item) {
    const modalRef = this.modalService.open(RemoveStudentComponent);
    modalRef.componentInstance.item = item;
  }

}
