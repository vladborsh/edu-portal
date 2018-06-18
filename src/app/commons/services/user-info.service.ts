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
export class UserInfoService {

  private source = new BehaviorSubject<User>({});
  
  constructor(private backend: BackendService) { }

  public update(id: string) {
    this.backend.get(`user/${id}`)
      .subscribe((data: User) => this.source.next(data));
  }

  public getData(id: string) {
    this.update(id);
    return this.source.asObservable();
  }

}
