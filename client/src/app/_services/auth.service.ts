import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:5001/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(authinfo:any): Observable<any> {
    return this.http.post(AUTH_API + 'login', authinfo, httpOptions);
  }

  register(signupinfo:any): Observable<any> {
    return this.http.post(AUTH_API + 'register', signupinfo, httpOptions);
  }
}
