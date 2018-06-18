import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreService } from '../../../commons/services/user-store.service';

@Component({
  selector: 'app-remove-teacher',
  templateUrl: './remove-teacher.component.html',
  styleUrls: ['./remove-teacher.component.scss']
})  
export class RemoveTeacherComponent implements OnInit {

  @Input() item: User;

  constructor(
    public activeModal: NgbActiveModal,
    private userStore: UserStoreService
  ) { }  

  ngOnInit() {
  }  

  submit() {
    this.userStore.remove(this.item._id);
    this.activeModal.close()
  }  

}  
