import { Injectable, Inject } from "@angular/core";
import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class BackendService {
  constructor(private http: HttpClient) {}

  public post<T,C>(urlPart: string, body: T): Observable<C> {
    const source = this.http.post<T>(this.getUrl(urlPart), body, this.getOptions());
    return this.requestHandler(source);
  }

  public get<T>(urlPart: string): Observable<T> {
    const source = this.http.get<T>(this.getUrl(urlPart), this.getOptions());
    return this.requestHandler(source);
  }

  public delete<T>(urlPart: string): Observable<T> {
    const source = this.http.delete<T>(this.getUrl(urlPart), this.getOptions());
    return this.requestHandler(source);
  }

  private getOptions() {
    const headers = new HttpHeaders({
      'Content-Type': "application/json; charset=utf-8",
      'X-Access-Token' : localStorage.getItem("token")
    })
    return {
      headers
    };
  }

  private getUrl(urlPart: string) {
    return `http://localhost:3000/api/${urlPart}`;
  }

  private requestHandler(source: Observable<any>): Observable<any> {
    return source.pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);

        return throwError(err);
      })
    );
  }
}
