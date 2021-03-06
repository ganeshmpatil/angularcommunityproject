import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/login.service';
import { TradeService } from '../trade.service';
import { Resources } from '../../resources';

@Component({
  selector: 'app-trade-home',
  templateUrl: './trade-home.component.html',
  styleUrls: ['./trade-home.component.css'],
})
export class TradeHomeComponent implements OnInit {
  allTradeDetails: any;
  itemsPerPage = 9;
  numberOfPages: any;
  currentPage = 1;
  count: number;
  loggedinUserId: any;
  isSearchMode = false;
  resources = Resources;
  searchOptions = {
    first_name: this.resources.FirstName,
    last_name: this.resources.LastName,
    item_name: this.resources.ItemName,
    item_desc: this.resources.ItemDescription
  };
  constructor(
    private loginService: LoginService,
    private tradeService: TradeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedinUserId = this.loginService.loginUserId;
    this.getAllTradeDetails(this.currentPage, this.itemsPerPage);
  }

  ngOnInit(): void {
    this.tradeService.getTradeCount().subscribe(
      (response: any) => {
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage)
        ).fill(1);
      },
      (error) => console.log(error)
    );
  }

  getCount() {
    this.tradeService.getTradeCount().subscribe(
      (response: any) => {
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage)
        ).fill(1);
      },
      (error) => console.log(error)
    );
  }

  getAllTradeDetails(page: number, itemCountToFetch: number) {
    this.tradeService
      .getTradeyByPage(this.loginService.loginUserId, page, itemCountToFetch)
      .subscribe(
        (response: any) => {
          // console.log('all user articles ' + JSON.stringify(response));
          this.allTradeDetails = response;
        },
        (error) => console.log(error)
      );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }

  refreshOnDelete() {
    this.getCount();
    this.getAllTradeDetails(this.currentPage, this.itemsPerPage);
  }

  handlePageChange(payload) {
    console.log('handlePageChange :- ' + payload);
    this.getAllTradeDetails(payload, this.itemsPerPage);
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
    this.allTradeDetails = payload;
  }

  handleSearchCancel(){
    this.isSearchMode = false;
    this.getAllTradeDetails(this.currentPage, this.itemsPerPage);
  }

}
