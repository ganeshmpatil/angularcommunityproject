import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { LoginService } from '../../shared/login.service';
import { Resources } from '../../resources';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  resources = Resources;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
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
}
