import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitizenregistrationService } from '../citizenregistration.service';

@Component({
  selector: 'app-citizenregistryhome',
  templateUrl: './citizenregistryhome.component.html',
  styleUrls: ['./citizenregistryhome.component.css'],
})
export class CitizenregistryhomeComponent implements OnInit {
  allUserDetails: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CitizenregistrationService
  ) {}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(
      (response) => {
        this.allUserDetails = response;
        this.allUserDetails.forEach(function (value) {
          console.log(value);
        });
      },
      (error) => console.log(error)
    );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }
}
