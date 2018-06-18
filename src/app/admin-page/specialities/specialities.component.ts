import { Component, OnInit, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Speciality } from '../../models/speciality.model';
import { SpecialityStoreService } from '../../commons/services/speciality-store.service';
import { Institute } from '../../models/instutute.model';
import { InstituteStoreService } from '../../commons/services/institute-store.service';
import { RemoveSpecialityComponent } from '../modals/remove-speciality/remove-speciality.component';
import { NewSpecialityComponent } from '../modals/new-speciality/new-speciality.component';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss']
})
export class SpecialitiesComponent implements OnInit {

  public specialities$: Observable<Speciality[]>;
  public institutes$: Observable<Institute[]>;
  public instituteFilter: string;

  constructor(
    private modalService: NgbModal,
    private specialityStore: SpecialityStoreService,
    private instituteStore: InstituteStoreService
  ) { }

  ngOnInit() {
    this.institutes$ = this.instituteStore.getData();
    this.specialities$ = this.specialityStore.getData();
  }

  add() {
    const modalRef = this.modalService.open(NewSpecialityComponent);
  }

  remove(item) {
    const modalRef = this.modalService.open(RemoveSpecialityComponent);
    modalRef.componentInstance.item = item;
  }

  filterInstitute( speciality: string ) {
    this.instituteFilter = speciality;
  }

}

@Pipe({
  name: 'filterSpeciality',
  pure: false
})
export class FilterSpeciality implements PipeTransform {
  transform(items: Speciality[], filter: Speciality): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => 
      (filter.title ? this.match(item.title,filter.title) : true) &&
      (filter.institute ? this.match(item.institute, filter.institute) : true) 
    );
  }

  match( copmparedValue, value ) {
    if (!copmparedValue) return false;
    return copmparedValue.toLowerCase().indexOf(value.toLowerCase()) != -1
  }
}
