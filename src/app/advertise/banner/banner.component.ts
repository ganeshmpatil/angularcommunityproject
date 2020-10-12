import { Component, OnInit } from '@angular/core';
import { AdvertiseService } from '../advertise.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  constructor(private adService: AdvertiseService) {}
  advertises: any[];

  ngOnInit(): void {
    this.getAdvertisements();
  }

  getAdvertisements() {
    this.adService.getAdvertise().subscribe(
      (response) => {
        this.advertises = response;
      },
      (error) => console.log(error)
    );
  }
}
