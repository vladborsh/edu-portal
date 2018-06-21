import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from '../../commons/backend.service';
import { tap, switchMap, withLatestFrom, map, filter } from 'rxjs/operators';
import { Institute } from '../../models/instutute.model';
import { Subject } from '../../models/subject.model';
import { Group, Journal, Mark } from '../../models/group.model';
import { ResponseModel } from '../../models/response.model';
import { Scheduling } from '../../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class GroupStoreService {

  private source = new BehaviorSubject<Group[]>([]);
  private details = new BehaviorSubject<Group>({});
  private scheduling = new BehaviorSubject<Scheduling[]>([]);
  
  constructor(private backendService: BackendService) { }

  public update(){
    this.backendService.get('group')
      .subscribe((data: Group[]) => this.source.next(data));
  }

  public add(item: Institute): Observable<ResponseModel<Group>> {
    return this.backendService.post<Group,ResponseModel<Group>>(`group`, item)
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

  public getData(): Observable<Group[]> {
    this.update();
    return this.source.asObservable();
  }

  public getDataDetails(id: string): Observable<Group> {
    this.backendService.get(`group/${id}`)
      .subscribe((data: Group) => this.details.next(data));
    return this.details.asObservable();
  }

  public getSchedulingData(): Observable<Scheduling[]> {
    this.fetchScheduling();
    return this.scheduling.asObservable()
  }

  public extendJournal(journal: Journal): Observable<Journal> {
    return this.backendService.post(`group/extend_journal/${journal._id}`, journal)
  }

  public changeMark(mark: Mark): Observable<Mark> {
    return this.backendService.post(`group/mark/${mark._id}`, mark);
  }

  public scheduleSubject(scheduling: Scheduling): Observable<Scheduling> {
    let obs = scheduling._id
      ? this.backendService.post(`schedule/${scheduling._id}`, scheduling)
      : this.backendService.post(`schedule`, scheduling);
    obs.subscribe(
      tap(() => this.fetchScheduling())
    )
    return obs;
  }

  public fetchScheduling():Observable<Scheduling[]> {
    console.log('fetchScheduling')
    let obs = this.details.asObservable()
      .pipe(
        filter( group => group._id !== undefined ),
        switchMap( group => this.backendService.get<Scheduling[]>(`schedule/${group._id}`))
      )
    obs.subscribe((data: Scheduling[]) => this.scheduling.next(data));
    return obs;
      
  } 

}