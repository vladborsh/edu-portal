import { Injectable, Inject } from "@angular/core";
import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class BackendService {
  constructor(private http: HttpClient) {}

  public post<T>(urlPart: string, body: T): Observable<T> {
    return this.http.post<T>(this.getUrl(urlPart), body, this.getOptions());
  }

  public get<T>(urlPart: string, body: T): Observable<T> {
    return this.http.get<T>(this.getUrl(urlPart), this.getOptions());
  }

  public delete<T>(urlPart: string, body: T): Observable<T> {
    return this.http.delete<T>(this.getUrl(urlPart), this.getOptions());
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      })
    };
  }

  private getUrl(urlPart: string) {
    return `localhost:3000/api/${urlPart}`;
  }

  private requestHandler(source: Observable<any>): Observable<any> {
    return source.pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);

        return Observable.throw(err);
      })
    );
  }
}
