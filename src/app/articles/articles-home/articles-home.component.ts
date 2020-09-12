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
  loggedInUserArticleDetails: any;
  count: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ArticlesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.loginUserId = 'ganesh.patil.31@gmail.com';
    this.service.getArticlesCount().subscribe(
      (response: any) => {
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage)
        ).fill(1);
      },
      (error) => console.log(error)
    );
    this.getCurrentUserArticleDetails();
    this.getAllArticleDetails(this.currentPage, this.itemsPerPage);
  }

  getCurrentUserArticleDetails() {
    console.log('Logged in user' + this.loginService.loginUserId);
    if (this.loginService.loginUserId) {
      this.service
        .getArticlesByUserId(this.loginService.loginUserId)
        .subscribe((response: any) => {
          if (response.length > 0) {
            console.log('current user articles ' + response);
            this.loggedInUserArticleDetails = response;
          }
        });
    }
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

  loadPage(pageNumber) {
    if (pageNumber !== 1) {
      this.loggedInUserArticleDetails = null;
    } else {
      this.getCurrentUserArticleDetails();
    }
    console.log('Fetching next page for ' + pageNumber);
    this.getAllArticleDetails(
      this.itemsPerPage * (parseInt(pageNumber) - 1),
      this.itemsPerPage
    );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }
}
