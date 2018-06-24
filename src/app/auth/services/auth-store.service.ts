import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';

export interface UserAuthModel {
  id: string,
  role: string,
}

export interface AuthStoreModel {
  alert?: {},
  user?: User
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
