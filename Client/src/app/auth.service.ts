// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  setUserRoleFromToken(token: string): void {
    // const decodedToken: any = jwt_decode(token);

    // if (decodedToken.role) {
    //   this.userRoleSubject.next(decodedToken.role);
    // } else {
    //   console.error('User role is missing in the decoded token.', decodedToken);
    // }
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  isAuthenticated(): boolean {
    // Implement your logic to check if the user is authenticated
    // For example, check if there is a valid token in localStorage
    const token = localStorage.getItem('token');
    return !!token;
  }

  register(username: string, fullname: string,email: string, password: string, role: string, ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, fullname,email, password, role });
  }

  getUserDetails(): Observable<any> {
      return this.http.get(`${this.apiUrl}/user`);
  }
  

}
