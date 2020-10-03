import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BloodService } from '../blood.service';
@Component({
  selector: 'app-blood-home',
  templateUrl: './blood-home.component.html',
  styleUrls: ['./blood-home.component.css'],
})
export class BloodHomeComponent implements OnInit {
  allUsersBloodDetails: any;
  constructor(private bloodService: BloodService) {}

  ngOnInit(): void {
    this.bloodService.getBloodDetails().subscribe((response: any) => {
      this.allUsersBloodDetails = response;
      console.log(JSON.stringify(this.allUsersBloodDetails));
    });
  }
}
