import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BloodService } from '../blood.service';
import { LoginService } from '../../shared/login.service';
import { Resources } from '../../resources';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-blood-home',
  templateUrl: './blood-home.component.html',
  styleUrls: ['./blood-home.component.css'],
})
export class BloodHomeComponent implements OnInit {
  allUsersBloodDetails: any;
  resources = Resources;
  constructor(
    private bloodService: BloodService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.bloodService.getBloodDetails().subscribe((response: any) => {
      this.allUsersBloodDetails = response;
      console.log(this.allUsersBloodDetails);
    });
  }

  showRegistrationForm() {
    let isEntryAlreadyDone = false;

    for (const element of this.allUsersBloodDetails) {
      console.log('Element' + element);
      if (this.loginService.loginUserId === element.userid) {
        isEntryAlreadyDone = true;
        this.notificationService.addError(this.resources.AlreadyRegistred);
        break;
      }
    }

    if (!isEntryAlreadyDone){
      this.router.navigate(['registrationform'], { relativeTo: this.route });
    }
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
