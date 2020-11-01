import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/login.service';
import { Resources } from '../../resources';
import { Socket } from 'ngx-socket-io';
import { AdvertiseService } from '../advertise.service';
import { NotificationService } from '../../shared/notification.service';
import {ImageUploadComponent} from '../../shared/image-upload/image-upload.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  resources = Resources;
  imageUploadStatus: 'SUCCESS' | 'FAILED' = undefined;
  moduleName = 'Advertisement';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private advertiseService: AdvertiseService,
    private socket: Socket,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    userid: new FormControl(this.loginService.loginUserId, []),
    photo: new FormControl('', ),
    status: new FormControl('A', []),
  });

  onCancelClick() {
    this.router.navigate(['advertise/home']);
  }

  onResetClick() {
    this.registerForm.reset();
  }

  onSubmit() {

    if (this.imageUploadStatus === undefined || this.imageUploadStatus === 'FAILED')
    {
      this.notificationService.addError('Please upload imaged first');
      return;
    }
    this.advertiseService.createAdvertise(this.registerForm.value).subscribe(
      (response) => {
        this.notificationService.addSuccess(
          'Advertisement Details saved succesfully !!'
        );
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
        this.notificationService.addError(
          'Advertisement Details saved failed !!'
        );
      }
    );
  }

  handleImageUploadResponse(data)
  {
    if (data.fileName){
      this.registerForm.get('photo').setValue(data.fileName);
      this.imageUploadStatus = 'SUCCESS';
    }
    else{
      this.imageUploadStatus = 'FAILED';
    }
  }
}
