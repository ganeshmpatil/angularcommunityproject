import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitizenregistrationService } from '../citizenregistration.service';
import { LoginService } from '../../shared/login.service';

@Component({
  selector: 'app-citizenregistryhome',
  templateUrl: './citizenregistryhome.component.html',
  styleUrls: ['./citizenregistryhome.component.css'],
})
export class CitizenregistryhomeComponent implements OnInit {
  allUserDetails: any[];
  itemsPerPage: number = 2;
  loggedInUSerDetails: any;
  count: number;
  numberOfPages: any;
  currentPage: number = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CitizenregistrationService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.service.getCount().subscribe(
      (response: any) => {
        console.log('Response count is' + JSON.stringify(response));
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage) - 1
        ).fill(1);
      },
      (error) => console.log(error)
    );
    this.getCurrentUserDetails();
    this.getAllUserDetails(this.currentPage, this.itemsPerPage);
  }

  getCurrentUserDetails() {
    if (this.loginService.loginUserId) {
      this.loggedInUSerDetails = this.service
        .getUser(this.loginService.loginUserId)
        .subscribe((response: any) => {
          if (response.length > 0) {
            this.loggedInUSerDetails = response[0];
          }
        });
    }
  }

  getAllUserDetails(page: number, itemCountToFetch: number) {
    this.service
      .getAllUsers(this.loginService.loginUserId, page, itemCountToFetch)
      .subscribe(
        (response: any) => {
          this.allUserDetails = response;
        },
        (error) => console.log(error)
      );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }

  loadPage(pageNumber) {
    if (pageNumber !== 1) {
      this.loggedInUSerDetails = null;
    } else {
      this.getCurrentUserDetails();
    }
    console.log('Fetching next page for ' + pageNumber);
    this.getAllUserDetails(
      this.itemsPerPage * (parseInt(pageNumber) - 1),
      this.itemsPerPage
    );
  }
}
