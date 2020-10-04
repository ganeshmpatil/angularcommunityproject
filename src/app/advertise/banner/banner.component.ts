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
  images = [1, 2, 3].map(
    () => `https://picsum.photos/900/500?random&t=${Math.random()}`
  );

  ngOnInit(): void {
    this.getAdvertisements();
  }

  getAdvertisements() {
    this.adService.getAdvertise().subscribe(
      (response) => {
        console.log('adds are' + JSON.stringify(response));
        this.advertises = response;
      },
      (error) => console.log(error)
    );
  }
}
