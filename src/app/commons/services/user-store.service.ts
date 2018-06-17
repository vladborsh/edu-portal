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
export class UserStoreService {

  private studentsSource = new BehaviorSubject<User[]>([]);
  
  constructor(private backendService: BackendService) { }

  updateStudents(){
    this.backendService.get('user')
      .subscribe((data: User[]) => this.studentsSource.next(data));
  }

  public addStudent(user: User): Observable<ResponseModel<User>> {
    return this.backendService.post<User,ResponseModel<User>>(`user`, user)
      .pipe( 
        tap( () => this.updateStudents() )
      );
  }

  public removeStudent(id: string) {
    this.backendService.delete(`user/${id}`)
      .subscribe( () => {
        let sourceValue: any[] = this.studentsSource.getValue();
        sourceValue.forEach((item, index) => {
            if(item._id === id) { sourceValue.splice(index, 1); }
        });
        this.studentsSource.next(sourceValue);
      });
  }

  public getStudents() {
    return this.studentsSource.asObservable();
  }

}
