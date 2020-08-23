import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CitizenregistrationService {
  createUpdateUserPath: string = 'http://localhost:3000/user';
  getUsersPath: string = 'http://localhost:3000/users/';
  getUserPath: string = 'http://localhost:3000/user/';
  getCountPath: string = 'http://localhost:3000/userscount';

  constructor(private http: HttpClient) {}

  saveUser(user) {
   return this.http.post(this.createUpdateUserPath, user);
  }

  updateUser(user) {
    return this.http.put(this.createUpdateUserPath, user);
  }

  getAllUsers(excludeuserid, pageNumber, itemsPerPage) {
    console.log(
      'getAllUsers path' +
        this.getUsersPath +
        excludeuserid +
        '/' +
        pageNumber +
        '/' +
        itemsPerPage
    );
    return this.http.get<any[]>(
      this.getUsersPath + excludeuserid + '/' + pageNumber + '/' + itemsPerPage
    );
  }

  getUser(userId) {
    console.log('USer id :- ' + userId);
    return this.http.get<any[]>(this.getUserPath + userId);
  }

  getCount() {
    return this.http.get<any[]>(this.getCountPath);
  }
}
