import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialityStoreService } from '../../../commons/services/speciality-store.service';
import { Speciality } from '../../../models/speciality.model';

@Component({
  selector: 'app-remove-speciality',
  templateUrl: './remove-speciality.component.html',
  styleUrls: ['./remove-speciality.component.scss']
})
export class RemoveSpecialityComponent {

  @Input() item: Speciality;

  constructor(
    public activeModal: NgbActiveModal,
    private specialitytStore: SpecialityStoreService
  ) { }

  submit() {
    this.specialitytStore.remove(this.item._id);
    this.activeModal.close()
  }

}
