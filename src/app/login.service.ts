import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginPath = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
    console.log(
      'Checking user credentials : ' +
        this.loginPath +
        username +
        '/' +
        password
    );
    return this.http.get<any[]>(this.loginPath + username + '/' + password);
  }
}
