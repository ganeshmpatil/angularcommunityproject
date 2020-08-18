import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CitizenregistrationService {
  createUserPath: string = 'http://localhost:3000/user';
  getUsersPath: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  saveUser(user) {
    this.http.post(this.createUserPath, user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  getAllUsers() {
    return this.http.get<any[]>(this.getUsersPath);
  }
}
