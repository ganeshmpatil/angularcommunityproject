import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginPath = 'http://localhost:3000/user/';
  resetpath = 'http://localhost:3000/updatepassword/';
  sendEmailPath = 'http://localhost:3000/resetpassword/sendemail/';
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

  resetPassword(token: string, password: string) {
    console.log('Reset Url is ' + this.resetpath + token + '/' + password);
    return this.http.get(this.resetpath + token + '/' + password);
  }

  sendResetEmail(userid: string) {
    return this.http.get(this.sendEmailPath + userid);
  }
}
