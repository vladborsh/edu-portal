import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from '../../commons/backend.service';
import { tap } from 'rxjs/operators';
import { Institute } from '../../models/instutute.model';
import { Subject } from '../../models/subject.model';
import { Group } from '../../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupStoreService {

  private source = new BehaviorSubject<Group[]>([]);
  
  constructor(private backendService: BackendService) { }

  public update(){
    this.backendService.get('group')
      .subscribe((data: Group[]) => this.source.next(data));
  }

  public add(item: Institute): Observable<Group> {
    return this.backendService.post(`group`, item)
      .pipe( 
        tap( () => this.update() )
      );
  }

  public remove(id: string) {
    this.backendService.delete(`group/${id}`)
      .subscribe( () => {
        let sourceValue: any[] = this.source.getValue();
        sourceValue.forEach((item, index) => {
            if(item._id === id) { sourceValue.splice(index, 1); }
        });
        this.source.next(sourceValue);
      });
  }

  public getData() {
    this.update();
    return this.source.asObservable();
  }

}