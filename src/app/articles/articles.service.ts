import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  getAllArticlesPath: string = 'http://localhost:3000/articles/';
  getArticlePath: string = 'http://localhost:3000/article/';
  saveArtilePath: string = 'http://localhost:3000/article';
  getArticlesCountPath: string = 'http://localhost:3000/articlescount';

  constructor(private http: HttpClient) {}

  getAllArticlesByPage(excludeuserid, pageNumber, itemsPerPage) {
    return this.http.get<any[]>(
      this.getAllArticlesPath +
        excludeuserid +
        '/' +
        pageNumber +
        '/' +
        itemsPerPage
    );
  }

  getArticlesByUserId(userid) {
    return this.http.get<any[]>(this.getArticlePath + userid);
  }

  getArticlesByUserAndRecordId(userid, recordId) {
    return this.http.get<any[]>(this.getArticlePath + userid + '/' + recordId);
  }

  getArticlesCount() {
    return this.http.get<any[]>(this.getArticlesCountPath);
  }

  createArticles(article) {
    console.log('Creating articles' + article);
    return this.http.post(this.saveArtilePath, article);
  }

  updateArticles(article) {
    return this.http.put(this.saveArtilePath, article);
  }
}
