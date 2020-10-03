import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdvertiseService {
  saveAdvertisePath: string = 'http://localhost:3000/advertise';
  getAdvertisePath: string = 'http://localhost:3000/advertises';

  constructor(private http: HttpClient) {}

  createAdvertise(advertise) {
    return this.http.post(this.saveAdvertisePath, advertise);
  }

  getAdvertise() {
    return this.http.get<any[]>(this.getAdvertisePath);
  }
}
