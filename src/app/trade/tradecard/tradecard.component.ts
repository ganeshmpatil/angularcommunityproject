import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TradeService } from '../trade.service';
import { NotificationService } from '../../shared/notification.service';
import { NotificationListComponent } from 'src/app/shared/notification-list/notification-list.component';
import { Resources } from '../../resources';

@Component({
  selector: 'app-tradecard',
  templateUrl: './tradecard.component.html',
  styleUrls: ['./tradecard.component.css'],
})
export class TradecardComponent implements OnInit {
  @Input() tradeDetails: any;
  @Input() showUpdateButton: boolean;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  resources = Resources;
  _showModal: boolean;
  imageSource: string[] = [
    'https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  ];
  constructor(
    private router: Router,
    private tradeService: TradeService,
    private notificationService: NotificationService
  ) {}

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

  toggleModal() {
    this._showModal = !this._showModal;
  }

  delete() {
    this.tradeDetails.status = 'C';
    this.tradeService.updateTrade(this.tradeDetails).subscribe(
      (response) => {
        this.notificationService.addSuccess(
          this.resources.TradeDetailsDeleteSuccess
        );
        this.deleteEvent.emit(null);
      },

      (error) => {
        this.notificationService.addError(
          this.resources.TradeDetailsDeleteFail
        );
      }
    );
  }
}
