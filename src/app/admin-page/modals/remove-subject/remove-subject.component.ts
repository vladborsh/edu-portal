import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectStoreService } from '../../../commons/services/subject-store.service';
import { Subject } from '../../../models/subject.model';

@Component({
  selector: 'app-remove-subject',
  templateUrl: './remove-subject.component.html',
  styleUrls: ['./remove-subject.component.scss']
})
export class RemoveSubjectComponent {

  @Input() item: Subject;

  constructor(
    public activeModal: NgbActiveModal,
    private subjectStore: SubjectStoreService
  ) { }

  submit() {
    this.subjectStore.remove(this.item._id);
    this.activeModal.close()
  }

}
