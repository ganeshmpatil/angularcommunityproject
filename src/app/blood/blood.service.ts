import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BloodService {
  constructor(private http: HttpClient) {}

  getAllBloodDetailsPath: string = 'http://localhost:3000/blood/';
  saveBloodDetailsPath: string = 'http://localhost:3000/blood';
  getBloodByGroupPath: string = 'http://localhost:3000/blood';

  createBloodDetails(blood) {
    return this.http.post(this.saveBloodDetailsPath, blood);
  }

  updateBloodDeDetails(blood) {
    return this.http.put(this.saveBloodDetailsPath, blood);
  }
  getBloodDetailsByGroup(bloodGroupId) {
    return this.http.get(this.getAllBloodDetailsPath + bloodGroupId);
  }

  getBloodDetails() {
    return this.http.get(this.getAllBloodDetailsPath);
  }
}
