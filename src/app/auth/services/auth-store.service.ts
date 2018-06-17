import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { BackendService } from '../../commons/backend.service';
import { tap } from 'rxjs/operators';

export interface AuthStoreModel {
  alert?: {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  private source = new BehaviorSubject<AuthStoreModel>({});
  
  constructor() { }

  public setData(_model: AuthStoreModel): void {
    this.source.next( Object.assign(this.source.getValue(), _model ) );
  }

  public getData(): Observable<AuthStoreModel> {
    return this.source.asObservable();
  }

}
