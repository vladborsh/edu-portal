import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreService } from '../../../commons/services/user-store.service';
import { SubjectStoreService } from '../../../commons/services/subject-store.service';

@Component({
  selector: 'app-remove-subject',
  templateUrl: './remove-subject.component.html',
  styleUrls: ['./remove-subject.component.scss']
})
export class RemoveSubjectComponent {

  @Input() item: User;

  constructor(
    public activeModal: NgbActiveModal,
    private subjectStore: SubjectStoreService
  ) { }

  submit() {
    this.subjectStore.remove(this.item._id);
    this.activeModal.close()
  }

}
