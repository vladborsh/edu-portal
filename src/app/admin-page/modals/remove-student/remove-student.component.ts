import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreService } from '../../../commons/services/user-store.service';

@Component({
  selector: 'app-remove-student',
  templateUrl: './remove-student.component.html',
  styleUrls: ['./remove-student.component.scss']
})
export class RemoveStudentComponent implements OnInit {

  @Input() item: User;

  constructor(
    public activeModal: NgbActiveModal,
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.activeModal.close()
    this.userStore.removeStudent(this.item._id);
  }

}
