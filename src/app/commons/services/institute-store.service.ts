import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { BackendService } from '../../commons/backend.service';
import { tap } from 'rxjs/operators';
import { Institute } from '../../models/instutute.model';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class InstituteStoreService {

  private source = new BehaviorSubject<Institute[]>([]);
  
  constructor(private backendService: BackendService) { }

  update(){
    this.backendService.get('institute')
      .subscribe((data: Institute[]) => this.source.next(data));
  }

  public add(item: Institute): Observable<Institute> {
    return this.backendService.post(`institute`, item)
      .pipe( 
        tap( () => this.update() )
      );
  }

  public updateItem(item: Institute): Observable<ResponseModel<Institute>> {
    return this.backendService.post<Institute,ResponseModel<Institute>>(`institute/${item._id}`, item)
      .pipe( 
        tap( () => this.update() )
      );
  }

  public remove(id: string) {
    this.backendService.delete(`institute/${id}`)
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
