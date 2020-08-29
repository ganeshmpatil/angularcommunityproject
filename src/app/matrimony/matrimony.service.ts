import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MatrimonyService {
  createMatrimonyPath: string = 'http://localhost:3000/matrimony';
  getMatrimoniesByPagePath: string = 'http://localhost:3000/matrimony/';
  getMatrimonyPath: string = 'http://localhost:3000/matrimony/';
  getCountPath: string = 'http://localhost:3000/matrimonycount';

  constructor(private http: HttpClient) {}

  getMatrimonyCount() {
    return this.http.get<any[]>(this.getCountPath);
  }

  createMatrimony(matrimony) {
    return this.http.post(this.createMatrimonyPath, matrimony);
  }

  updateMatrimony(matrimony) {
    return this.http.put(this.createMatrimonyPath, matrimony);
  }

  getMatrimonyByPage(excludeuserid, pageNumber, itemsPerPage) {
    return this.http.get<any[]>(
      this.getMatrimoniesByPagePath +
        excludeuserid +
        '/' +
        pageNumber +
        '/' +
        itemsPerPage
    );
  }

  getMatrimonyById(id) {
    return this.http.get(this.getMatrimoniesByPagePath, id);
  }
}
