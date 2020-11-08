import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchPath = 'http://localhost:3000/search/';

  search(searchTerm, searchValue, searchEntity) {
    console.log(
      'calling get ' +
        this.searchPath +
        searchEntity +
        '/' +
        searchTerm +
        '/' +
        searchValue
    );
    return this.http.get<any[]>(
      this.searchPath + searchEntity + '/' + searchTerm + '/' + searchValue
    );
  }

  constructor(private http: HttpClient) {}
}
