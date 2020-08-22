import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CitizenregistrationService {
  createUserPath: string = 'http://localhost:3000/user';
  getUsersPath: string = 'http://localhost:3000/users/';
  getUserPath: string = 'http://localhost:3000/user/';

  constructor(private http: HttpClient) {}

  saveUser(user) {
    this.http.post(this.createUserPath, user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  getAllUsers(excludeuserid) {
    return this.http.get<any[]>(this.getUsersPath + excludeuserid);
  }

  getUser(userId) {
    console.log('USer id :- ' + userId);
    return this.http.get<any[]>(this.getUserPath + userId);
  }
}
