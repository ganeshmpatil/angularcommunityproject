import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tradecard',
  templateUrl: './tradecard.component.html',
  styleUrls: ['./tradecard.component.css'],
})
export class TradecardComponent implements OnInit {
  @Input() tradeDetails: any;
  @Input() showUpdateButton: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  showUpdateForm() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userid: this.tradeDetails.userid,
        item_photo_1: this.tradeDetails.item_photo_1,
        item_photo_2: this.tradeDetails.item_photo_2,
        item_photo_3: this.tradeDetails.item_photo_3,
        item_photo_4: this.tradeDetails.item_photo_4,
        item_photo_5: this.tradeDetails.item_photo_5,
        item_name: this.tradeDetails.item_name,
        item_desc: this.tradeDetails.item_desc,
        contact_number: this.tradeDetails.contact_number,
        contact_email: this.tradeDetails.contact_email,
        amount: this.tradeDetails.amount,
        recordnumber: this.tradeDetails.recordnumber,
        status: 'A',
        mode: 'UPDATE',
      },
    };

    this.router.navigate(['trade/home/registrationform'], navigationExtras);
  }
}
