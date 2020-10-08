import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/login.service';
import { MatrimonyService } from '../matrimony.service';

@Component({
  selector: 'app-matrimony-home',
  templateUrl: './matrimony-home.component.html',
  styleUrls: ['./matrimony-home.component.css'],
})
export class MatrimonyHomeComponent implements OnInit {
  loggedinUserMatrimonyDetails: any;
  allUserMatrimonyDetails: any[];
  itemsPerPage: number = 5;
  numberOfPages: any;
  currentPage: number = 1;
  count: number;
  constructor(
    private loginService: LoginService,
    private matrimonyService: MatrimonyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.loginUserId = 'ganesh.patil.31@gmail.com';
    this.matrimonyService.getMatrimonyCount().subscribe(
      (response: any) => {
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage)
        ).fill(1);
      },
      (error) => console.log(error)
    );
    this.getCurrentUserMatrimonyDetails();
    this.getAllMatrimonyDetails(this.currentPage, this.itemsPerPage);
  }

  getCurrentUserMatrimonyDetails() {
    console.log('Logged in user' + this.loginService.loginUserId);
    if (this.loginService.loginUserId) {
      this.matrimonyService
        .getMatrimonyById(this.loginService.loginUserId)
        .subscribe((response: any) => {
          if (response.length > 0) {
            //console.log('current user matrimony' + JSON.stringify(response));
            this.loggedinUserMatrimonyDetails = response;
          }
        });
    }
  }

  loadPage(pageNumber) {
    if (pageNumber !== 1) {
      this.loggedinUserMatrimonyDetails = null;
    } else {
      this.loggedinUserMatrimonyDetails();
    }
    console.log('Fetching next page for ' + pageNumber);
    this.getAllMatrimonyDetails(
      this.itemsPerPage * (parseInt(pageNumber) - 1),
      this.itemsPerPage
    );
  }

  getAllMatrimonyDetails(page: number, itemCountToFetch: number) {
    this.matrimonyService
      .getMatrimonyByPage(this.loginService.loginUserId, page, itemCountToFetch)
      .subscribe(
        (response: any) => {
          //console.log('all user articles ' + JSON.stringify(response));
          this.allUserMatrimonyDetails = response;
        },
        (error) => console.log(error)
      );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }

  refereshOnDelete() {
    console.log('refereshOnDelete called');
    this.loggedinUserMatrimonyDetails = null;
    this.getAllMatrimonyDetails(this.currentPage, this.itemsPerPage);
  }
}
