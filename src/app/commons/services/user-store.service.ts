import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { BackendService } from '../../commons/backend.service';
import { tap, map } from 'rxjs/operators';
import { Institute } from '../../models/instutute.model';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private source = new BehaviorSubject<User[]>([]);
  private datailsSource = new BehaviorSubject<User>({});
  
  constructor(private backendService: BackendService) { }

  public updateDetails(id: string) {
    this.backendService.get(`user/${id}`)
      .subscribe((data: User) => this.datailsSource.next(data));
  }

  public update(){
    this.backendService.get('user')
      .subscribe((data: User[]) => this.source.next(data));
  }

  public add(user: User): Observable<ResponseModel<User>> {
    return this.backendService.post<User,ResponseModel<User>>(`user`, user)
      .pipe( 
        tap( () => this.update() )
      );
  }

  public remove(id: string) {
    this.backendService.delete(`user/${id}`)
      .subscribe( () => {
        let sourceValue: any[] = this.source.getValue();
        sourceValue.forEach((item, index) => {
            if(item._id === id) { sourceValue.splice(index, 1); }
        });
        this.source.next(sourceValue);
      });
  }

  public getStudents(speciality?: string, course?: string): Observable<User[]> {
    this.update()
    return this.source.asObservable().pipe(
      map( (users: User[]) => users.filter((user: User) => user.role === 'Student') )
    );
  }

  public getTeachers(): Observable<User[]> {
    this.update()
    return this.source.asObservable().pipe(
      map( (users: User[]) => users.filter((user: User) => user.role === 'Teacher') )
    );
  }

  public getDetails(id?: string): Observable<User> {
    if (!id) id = localStorage.getItem('uid');
    this.updateDetails(id);
    return this.datailsSource.asObservable();
  }

}
