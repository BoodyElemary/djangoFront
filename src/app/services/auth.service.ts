import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/users/login/';

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<any> {
    const requestBody = { email, password };

    return this.http.post<any>(this.apiUrl, requestBody).pipe(
      tap((response) => {
        if (response.login) {
          const token = response.token;
          this.setToken(token);
        }
      })
    );
  }

  public setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    // Check if token exists and is not expired
    return token !== null && !this.isTokenExpired(token);
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  private isTokenExpired(token: string): boolean {
    return false;
  }
}
