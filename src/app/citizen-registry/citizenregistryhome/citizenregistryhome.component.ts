import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitizenregistrationService } from '../citizenregistration.service';
import { LoginService } from '../../shared/login.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-citizenregistryhome',
  templateUrl: './citizenregistryhome.component.html',
  styleUrls: ['./citizenregistryhome.component.css'],
})
export class CitizenregistryhomeComponent implements OnInit {
  allUserDetails: any[];
  itemsPerPage = 5;
  loggedInUSerDetails: any;
  loggedinUserId: any;
  count: number;
  numberOfPages: any;
  currentPage = 1;
  isSearchMode = false;
  searchOptions = {
    first_name: 'First Name',
    last_name: 'Last Name',
    father_full_name: 'Father Name',
    mobile_number: 'Mobile Number',
    village_name: 'Village Name',
    city: 'City',
    education_degree: 'Education'
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CitizenregistrationService,
    private loginService: LoginService
  ) {
    this.loggedinUserId = this.loginService.loginUserId;
  }

  ngOnInit(): void {
    this.service.getCount().subscribe(
      (response: any) => {
        console.log('ngOnInit Response count is' + JSON.stringify(response));
        this.count = response.count;
        this.numberOfPages = Array(
          Math.ceil(this.count / this.itemsPerPage) - 1
        ).fill(1);
      },
      (error) => console.log(error)
    );
    this.getAllUserDetails(this.currentPage, this.itemsPerPage);
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


  handlePageChange(payload) {
    console.log('handlePageChange :- ' + payload);
    this.getAllUserDetails(payload, this.itemsPerPage);
  }

  handleSearchResult(payload){
    this.isSearchMode = true;
    this.allUserDetails = payload;
  }

  handleSearchCancel(){
    this.isSearchMode = false;
    this.getAllUserDetails(this.currentPage, this.itemsPerPage);
  }
}
