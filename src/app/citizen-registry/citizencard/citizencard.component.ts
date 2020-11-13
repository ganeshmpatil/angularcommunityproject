import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataProvider } from '../../shared/data-provider';
import { Resources } from '../../resources';

@Component({
  selector: 'app-citizencard',
  templateUrl: './citizencard.component.html',
  styleUrls: ['./citizencard.component.css'],
})
export class CitizencardComponent implements OnInit {
  @Input() showUpdateButton = false;
  @Input() userDetails: any;
  resources = Resources;
  constructor(private router: Router, private dataProvider: DataProvider) {}

  ngOnInit(): void {}

  showUpdateForm() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userid: this.userDetails.userid,
        first_name: this.userDetails.first_name,
        last_name: this.userDetails.last_name,
        father_full_name: this.userDetails.father_full_name,
        mobile_number: this.userDetails.mobile_number,
        village_name: this.userDetails.village_name,
        email_id: this.userDetails.email_id,
        address_line_1: this.userDetails.address_line_1,
        address_line_2: this.userDetails.address_line_2,
        address_line_3: this.userDetails.address_line_3,
        city: this.userDetails.city,
        state_name: this.userDetails.state_name,
        suburb_taluka: this.userDetails.suburb_taluka,
        user_summary: this.userDetails.user_summary,
        education_degree: this.userDetails.education_degree,
        gender: this.userDetails.gender,
        pin_code: this.userDetails.pin_code,
      },
    };

    this.dataProvider.setData(this.userDetails.user_password);
    this.router.navigate(['registry/home/registrationform'], navigationExtras);
  }
}
