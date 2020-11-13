import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/login.service';
import { Resources } from '../../resources';
import { Router, ActivatedRoute } from '@angular/router';
import { MatrimonyService } from '../matrimony.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../shared/notification.service';
import { Socket } from 'ngx-socket-io';
import {ImageUploadComponent} from '../../shared/image-upload/image-upload.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe],
})
export class RegisterComponent implements OnInit {
  @Input() mode: 'CREATE' | 'UPDATE' = 'CREATE';
  imageUploadStatus: 'SUCCESS' | 'FAILED' = undefined;
  moduleName = 'matrimony';
  resources = Resources;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private matrimonyService: MatrimonyService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private socket: Socket
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('Params ' + JSON.stringify(params));
      if (params['mode'] != undefined) {
        this.mode = 'UPDATE';
        this.registerForm.get('userid').setValue(params['userid']);
        this.registerForm.get('occupation').setValue(params['occupation']);
        this.registerForm.get('user_summary').setValue(params['user_summary']);
        this.registerForm.get('photo').setValue(params['photo']);
        this.registerForm
          .get('birth_date')
          .setValue(
            this.datePipe.transform(
              new Date(params['birth_date']),
              'yyyy-MM-dd'
            )
          );
        this.registerForm.get('gotra').setValue(params['gotra']);
      }
    });
  }

  ngOnInit(): void {}

  registerForm = new FormGroup({
    userid: new FormControl(this.loginService.loginUserId, []),
    occupation: new FormControl('', [Validators.required]),
    user_summary: new FormControl('', [Validators.required]),
    photo: new FormControl('', []),
    birth_date: new FormControl('', []),
    gotra: new FormControl(''),
    matrimony_image_input: new FormControl('', []),
  });

  onSubmit() {
    this.registerForm.value['status'] = 'A';
    console.log('Image upload status ' + this.imageUploadStatus);
    if (!this.isUpdateMode()) {
      if (this.imageUploadStatus === undefined || this.imageUploadStatus === 'FAILED')
      {
        this.notificationService.addError(this.resources.ImageUploadValidation);
      } else {
      this.matrimonyService.createMatrimony(this.registerForm.value).subscribe(
        (response) => {
          this.notificationService.addSuccess(
            this.resources.MatrimonyDetailsSaveSuccess
          );
          this.router.navigate(['matrimony/home']);
        },
        (error) => {
          console.log(error);
          this.notificationService.addError(this.resources.MatrimonyDetailsSaveFail);
        }
      );
    }
  } else {
      this.matrimonyService.updateMatrimony(this.registerForm.value).subscribe(
        (response) => {
          this.router.navigate(['matrimony/home']);
          this.notificationService.addSuccess(
            this.resources.MatrimonyDetailsUpdateSuccess
          );
        },
        (error) => {
          console.log(error);
          this.notificationService.addError(this.resources.MatrimonyDetailsUpdateFail);
        }
      );
    }
  }

  isUpdateMode() {
    if (this.mode === 'UPDATE') {
      return true;
    }
    return false;
  }

  onResetClick() {
    this.registerForm.reset();
  }

  onCancelClick() {
    this.router.navigate(['matrimony/home']);
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
