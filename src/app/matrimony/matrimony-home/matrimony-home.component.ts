import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/login.service';

@Component({
  selector: 'app-matrimony-home',
  templateUrl: './matrimony-home.component.html',
  styleUrls: ['./matrimony-home.component.css'],
})
export class MatrimonyHomeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  showRegistrationForm() {
    this.router.navigate(['registrationform'], { relativeTo: this.route });
  }
}
