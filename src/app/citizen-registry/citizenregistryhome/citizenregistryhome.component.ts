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
  loggedInUSerDetails: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CitizenregistrationService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.loginUserId = 'ganesh.patil.31@gmail.com';
    if (this.loginService.loginUserId) {
      this.loggedInUSerDetails = this.service
        .getUser(this.loginService.loginUserId)
        .subscribe((response: any) => {
          if (response.length > 0) {
            this.loggedInUSerDetails = response[0];
          }
        });
    }
    this.service.getAllUsers(this.loginService.loginUserId).subscribe(
      (response: any) => {
        this.allUserDetails = response;
      },
      (error) => console.log(error)
    );
  }

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }
}
