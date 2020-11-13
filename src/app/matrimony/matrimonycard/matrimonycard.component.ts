import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatrimonyService } from '../matrimony.service';
import { NotificationService } from '../../shared/notification.service';
import { Subject, Observable } from 'rxjs';
import { Resources } from '../../resources';

@Component({
  selector: 'app-matrimonycard',
  templateUrl: './matrimonycard.component.html',
  styleUrls: ['./matrimonycard.component.css'],
})
export class MatrimonycardComponent implements OnInit {
  @Input() matrimonyDetail: any;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  age: number;
  @Input() showUpdateButton: boolean;
  resources = Resources;
  public delete$: Subject<string>;

  constructor(
    private router: Router,
    private matrimonyService: MatrimonyService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if (new Date(this.matrimonyDetail.birth_date).getFullYear() !== undefined) {
      this.age =
        new Date().getFullYear() -
        new Date(this.matrimonyDetail.birth_date).getFullYear();
    }
  }

  showUpdateForm() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        userid: this.matrimonyDetail.userid,
        occupation: this.matrimonyDetail.occupation,
        user_summary: this.matrimonyDetail.user_summary,
        birth_date: this.matrimonyDetail.birth_date,
        gotra: this.matrimonyDetail.gotra,
        status: 'A',
        mode: 'UPDATE',
      },
    };

    this.router.navigate(['matrimony/home/registrationform'], navigationExtras);
  }

  delete() {
    this.matrimonyDetail.status = 'C';
    this.matrimonyService.updateMatrimony(this.matrimonyDetail).subscribe(
      (response) => {
        this.notificationService.addSuccess(
          this.resources.MatrimonyDetailsDeleteSuccess
        );
        console.log(this.deleteEvent);
        this.deleteEvent.emit(null);
      },

      (error) => {
        this.notificationService.addError(this.resources.MatrimonyDetailsDeleteFail);
        console.log(error);
      }
    );
  }
}
