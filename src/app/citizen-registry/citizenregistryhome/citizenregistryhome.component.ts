import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitizenregistrationService } from '../citizenregistration.service';
import { LoginService } from '../../shared/login.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Resources } from '../../resources';

@Component({
  selector: 'app-citizenregistryhome',
  templateUrl: './citizenregistryhome.component.html',
  styleUrls: ['./citizenregistryhome.component.css'],
})
export class CitizenregistryhomeComponent implements OnInit {
  allUserDetails: any[];
  itemsPerPage = 9;
  loggedinUserId: any;
  count: number;
  numberOfPages: any;
  currentPage = 1;
  isSearchMode = false;
  resources = Resources;
  searchOptions = {
    first_name: this.resources.FirstName,
    last_name: this.resources.LastName,
    father_full_name: this.resources.FatherName,
    mobile_number: this.resources.MobileNumber,
    village_name: this.resources.VillageName,
    city: this.resources.City,
    education_degree: this.resources.EducationDegree
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
