import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { BackendService } from '../../commons/backend.service';
import { tap } from 'rxjs/operators';
import { Institute } from '../../models/instutute.model';
import { Speciality } from '../../models/speciality.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialityStoreService {

  private source = new BehaviorSubject<Speciality[]>([]);
  
  constructor(private backendService: BackendService) { }

  public update(){
    this.backendService.get('speciality')
      .subscribe((data: Speciality[]) => this.source.next(data));
  }

  public add(item: Institute): Observable<Speciality> {
    return this.backendService.post(`speciality`, item)
      .pipe( 
        tap( () => this.update() )
      );
  }

  public remove(id: string) {
    this.backendService.delete(`speciality/${id}`)
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
