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
  allUserMatrimonyDetails: any[];
  itemsPerPage = 5;
  loggedinUserId: any;
  numberOfPages: any;
  currentPage = 1;
  count: number;
  isSearchMode = false;
  searchOptions = {
    first_name: 'First Name',
    last_name: 'Last Name',
    gotra: 'Gotra',
    occupation: 'Occupation'
  };
  constructor(
    private loginService: LoginService,
    private matrimonyService: MatrimonyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedinUserId = this.loginService.loginUserId;
  }

  ngOnInit(): void {
    this.getCount();
    this.getAllMatrimonyDetails(this.currentPage, this.itemsPerPage);
  }

  getCount() {
    this.matrimonyService.getMatrimonyCount().subscribe(
      (response: any) => {
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage)
        ).fill(1);
      },
      (error) => console.log(error)
    );
  }

  getAllMatrimonyDetails(page: number, itemCountToFetch: number) {
    this.matrimonyService
      .getMatrimonyByPage(this.loginService.loginUserId, page, itemCountToFetch)
      .subscribe(
        (response: any) => {
          // console.log('all user articles ' + JSON.stringify(response));
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
    this.getCount();
    this.getAllMatrimonyDetails(this.currentPage, this.itemsPerPage);
  }
  handlePageChange(payload) {
    console.log('handlePageChange :- ' + payload);
    this.getAllMatrimonyDetails(payload, this.itemsPerPage);
  }

  isUserLoggedIn() {
    if (
      this.loginService.loginUserId !== null &&
      this.loginService.loginUserId !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSearchResult(payload){
    this.isSearchMode = true;
    this.allUserMatrimonyDetails = payload;
  }

  handleSearchCancel(){
    this.isSearchMode = false;
    this.getAllMatrimonyDetails(this.currentPage, this.itemsPerPage);
  }

}
