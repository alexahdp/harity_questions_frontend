import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthType, AuthDTO } from '@app/models/auth';
import { Observable, of } from 'rxjs';
import { User } from '@app/models/user';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api_server + '/user';

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('idea_token');
  }

  set token(token: string) {
    if (token) {
      localStorage.setItem('idea_token', token);
    } else {
      localStorage.removeItem('idea_token');
    }
  }

  private auth(authType: AuthType, data: AuthDTO) {
    return this.http.post(`${this.api}/${authType}`, data).pipe(
      mergeMap((user: User) => {
        this.token = user.token;
        return of(user);
      })
    )
  }

  signin(data: AuthDTO): Observable<User> {
    return this.auth('signin', data) as Observable<User>;
  }

  signup(data: AuthDTO) {
    this.auth('signup', data);
  }

  whoami() {
    return this.http.get(`${this.api}/whoami`, {
      headers: {authorization: `Bearer ${this.token}`}
    });
  }
}
