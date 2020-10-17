import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Resources } from '../../resources';
import { BloodService } from '../blood.service';
import { LoginService } from '../../shared/login.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-blood-register',
  templateUrl: './blood-register.component.html',
  styleUrls: ['./blood-register.component.css'],
})
export class BloodRegisterComponent implements OnInit {
  resources = Resources;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bloodService: BloodService,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    userid: new FormControl(this.loginService.loginUserId, []),
    blood_group: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.registerForm.value['status'] = 'A';
    this.bloodService.createBloodDetails(this.registerForm.value).subscribe(
      (response) => {
        this.notificationService.addSuccess(
          'Blood Details saved succesfully !!'
        );
        this.router.navigate(['blooddetails/home']);
      },

      (error) => {
        this.notificationService.addError('Blood Details save Failed !!');
        console.log(error);
      }
    );
  }

  onResetClick() {
    this.registerForm.reset();
  }
  onCancelClick() {
    this.router.navigate(['blooddetails/home']);
  }
}
