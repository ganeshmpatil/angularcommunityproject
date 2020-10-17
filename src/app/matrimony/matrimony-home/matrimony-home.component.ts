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
  itemsPerPage: number = 5;
  loggedinUserId: any;
  numberOfPages: any;
  currentPage: number = 1;
  count: number;
  constructor(
    private loginService: LoginService,
    private matrimonyService: MatrimonyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginService.loginUserId = 'ganesh.patil.31@gmail.com';
    this.loggedinUserId = this.loginService.loginUserId;
  }

  ngOnInit(): void {
    this.loginService.loginUserId = 'ganesh.patil.31@gmail.com';
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
    this.getCount();
    this.getAllMatrimonyDetails(this.currentPage, this.itemsPerPage);
  }
  handlePageChange(payload) {
    console.log('handlePageChange :- ' + payload);
    this.getAllMatrimonyDetails(payload, this.itemsPerPage);
  }
}
