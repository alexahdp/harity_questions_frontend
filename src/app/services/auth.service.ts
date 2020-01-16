import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthType, AuthDTO } from '@app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api_server + '/auth';

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
    return this.http.post(`${this.api}/${authType}`, data);
  }

  signin(data: AuthDTO) {
    this.auth('signin', data);
  }

  signup(data: AuthDTO) {
    this.auth('signup', data);
  }
}
