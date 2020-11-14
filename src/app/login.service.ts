import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap, map, switchMap, pluck } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginPath = 'http://localhost:3000/user/';
  resetpath = 'http://localhost:3000/updatepassword/';
  sendEmailPath = 'http://localhost:3000/resetpassword/sendemail/';

  private loginSubject: Subject<boolean>;
  login$: Observable<any>;
  constructor(private http: HttpClient) {
    this.loginSubject = new Subject();
    this.login$ = this.loginSubject.pipe(
      map(result => {
        console.log('In Observable ..result is ' + result);
        return { loginstatus: result };
      })
    );
  }

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

  updateLoginStatusGloabally(){
    this.loginSubject.next(true);
  }

  resetPassword(token: string, password: string) {
    console.log('Reset Url is ' + this.resetpath + token + '/' + password);
    return this.http.get(this.resetpath + token + '/' + password);
  }

  sendResetEmail(userid: string) {
    return this.http.get(this.sendEmailPath + userid);
  }
}
