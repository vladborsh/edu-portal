import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupStoreService } from '../../../commons/services/group-store.service';
import { Group } from '../../../models/group.model';

@Component({
  selector: 'app-remove-group',
  templateUrl: './remove-group.component.html',
  styleUrls: ['./remove-group.component.scss']
})
export class RemoveGroupComponent {

  @Input() item: Group;

  constructor(
    public activeModal: NgbActiveModal,
    private groupStore: GroupStoreService
  ) { }

  submit() {
    this.groupStore.remove(this.item._id);
    this.activeModal.close()
  }

}
