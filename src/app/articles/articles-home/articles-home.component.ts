import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { LoginService } from '../../shared/login.service';

@Component({
  selector: 'app-articles-home',
  templateUrl: './articles-home.component.html',
  styleUrls: ['./articles-home.component.css'],
})
export class ArticlesHomeComponent implements OnInit {
  allArticlesDetails: any[];
  itemsPerPage: number = 5;
  numberOfPages: any;
  currentPage: number = 1;
  loggedinUserId: any;
  count: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ArticlesService,
    private loginService: LoginService
  ) {
    this.loginService.loginUserId = 'ganesh.patil.31@gmail.com';
    this.loggedinUserId = this.loginService.loginUserId;
  }

  ngOnInit(): void {
    this.getCount();
    this.getAllArticleDetails(this.currentPage, this.itemsPerPage);
  }

  getCount() {
    this.service.getArticlesCount().subscribe(
      (response: any) => {
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage)
        ).fill(1);
      },
      (error) => console.log(error)
    );
  }

  getAllArticleDetails(page: number, itemCountToFetch: number) {
    this.service
      .getAllArticlesByPage(
        this.loginService.loginUserId,
        page,
        itemCountToFetch
      )
      .subscribe(
        (response: any) => {
          console.log('all user articles ' + response);
          this.allArticlesDetails = response;
        },
        (error) => console.log(error)
      );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }
  handlePageChange(payload) {
    console.log('handlePageChange :- ' + payload);
    this.getAllArticleDetails(payload, this.itemsPerPage);
  }
  refereshOnDelete() {
    console.log('refereshOnDelete called');
    this.getCount();
    this.getAllArticleDetails(this.currentPage, this.itemsPerPage);
  }
}
