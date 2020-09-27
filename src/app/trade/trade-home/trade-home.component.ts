import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/login.service';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-trade-home',
  templateUrl: './trade-home.component.html',
  styleUrls: ['./trade-home.component.css'],
})
export class TradeHomeComponent implements OnInit {
  loggedInUserTradeDetails: any;
  allTradeDetails: any;
  itemsPerPage: number = 5;
  numberOfPages: any;
  currentPage: number = 1;
  count: number;
  constructor(
    private loginService: LoginService,
    private tradeService: TradeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginService.loginUserId = 'ganesh.patil.31@gmail.com';
    this.tradeService.getTradeCount().subscribe(
      (response: any) => {
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage)
        ).fill(1);
      },
      (error) => console.log(error)
    );
    this.getCurrentUserTradeDetails();
    this.getAllTradeDetails(this.currentPage, this.itemsPerPage);
  }

  ngOnInit(): void {}

  getCurrentUserTradeDetails() {
    console.log('Logged in user' + this.loginService.loginUserId);
    if (this.loginService.loginUserId) {
      this.tradeService
        .getTradeDetailsByUserId(this.loginService.loginUserId)
        .subscribe((response: any) => {
          if (response.length > 0) {
            console.log('current user trade' + JSON.stringify(response));
            this.loggedInUserTradeDetails = response;
          }
        });
    }
  }

  getAllTradeDetails(page: number, itemCountToFetch: number) {
    this.tradeService
      .getTradeyByPage(this.loginService.loginUserId, page, itemCountToFetch)
      .subscribe(
        (response: any) => {
          //console.log('all user articles ' + JSON.stringify(response));
          this.allTradeDetails = response;
        },
        (error) => console.log(error)
      );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }
}
