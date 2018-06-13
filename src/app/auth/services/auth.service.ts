import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { config } from '../../config/dev.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authorise(user: User) {
    return this.http.post(config.apiUrl, user, httpOptions)
  }
}
