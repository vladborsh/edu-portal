import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { BackendService } from '../../commons/backend.service';
import { tap } from 'rxjs/operators';
import { Institute } from '../../models/instutute.model';
import { Subject } from '../../models/subject.model';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectStoreService {

  private source = new BehaviorSubject<Subject[]>([]);
  
  constructor(private backendService: BackendService) { }

  public update(user?: User){
    let query = (user && user._group)
      ? `subject?user_group=${user._group}`
      : `subject`;
    this.backendService.get(query)
      .subscribe((data: Subject[]) => this.source.next(data));
  }

  public add(item: Subject): Observable<ResponseModel<Subject>> {
    return this.backendService.post<Subject,ResponseModel<Subject>>(`subject`, item)
      .pipe( 
        tap( () => this.update() )
      );
  }

  public remove(id: string) {
    this.backendService.delete(`subject/${id}`)
      .subscribe( () => {
        let sourceValue: any[] = this.source.getValue();
        sourceValue.forEach((item, index) => {
            if(item._id === id) { sourceValue.splice(index, 1); }
        });
        this.source.next(sourceValue);
      });
  }

  public getData(user?: User): Observable<Subject[]> {
    this.update(user);
    return this.source.asObservable();
  }

}

