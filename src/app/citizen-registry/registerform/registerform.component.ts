import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitizenregistrationService } from '../citizenregistration.service';
import { ImageuploadserviceService } from '../../shared/imageuploadservice.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../../shared/data-provider';
import { Resources } from '../../resources';
import { NotificationService } from '../../shared/notification.service';


@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit {
  @Input() mode: 'CREATE' | 'UPDATE' = 'CREATE';
  imageUploadStatus: 'SUCCESS' | 'FAILED' = undefined;
  resources = Resources;
  moduleName = 'Citizen';
  constructor(
    private userService: CitizenregistrationService,
    private imageService: ImageuploadserviceService,
    private socket: Socket,
    private route: ActivatedRoute,
    private router: Router,
    private dataProvider: DataProvider,
    private notificationService: NotificationService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['userid'] !== undefined) {
        this.registerForm.get('userid').setValue(params['userid']);
        this.registerForm.get('last_name').setValue(params['last_name']);
        this.registerForm.get('first_name').setValue(params['first_name']);
        this.registerForm
          .get('address_line_1')
          .setValue(params['address_line_1']);
        this.registerForm
          .get('address_line_2')
          .setValue(params['address_line_2']);
        this.registerForm
          .get('address_line_3')
          .setValue(params['address_line_3']);
        this.registerForm.get('city').setValue(params['city']);

        this.registerForm
          .get('education_degree')
          .setValue(params['education_degree']);
        this.registerForm.get('user_image').setValue(params['user_image']);

        this.registerForm.get('email_id').setValue(params['email_id']);

        this.registerForm
          .get('father_full_name')
          .setValue(params['father_full_name']);

        this.registerForm.get('gender').setValue(params['gender']);

        this.registerForm
          .get('mobile_number')
          .setValue(params['mobile_number']);

        this.registerForm.get('pin_code').setValue(params['pin_code']);

        this.registerForm.get('state_name').setValue(params['state_name']);
        this.registerForm
          .get('suburb_taluka')
          .setValue(params['suburb_taluka']);

        this.registerForm.get('village_name').setValue(params['village_name']);
        this.registerForm.get('user_summary').setValue(params['user_summary']);
        this.mode = 'UPDATE';
      }
    });
  }

  /*End of Constructor */
  genderList: any = ['Male', 'Female'];

  get f() {
    return this.registerForm.controls;
  }

  registerForm = new FormGroup({
    userid: new FormControl('', [Validators.required]),
    user_password: new FormControl('', [Validators.required]),
    user_confirm_password: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    father_full_name: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    mobile_number: new FormControl('', [Validators.required]),
    email_id: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    village_name: new FormControl('', [Validators.required]),
    address_line_1: new FormControl('', [Validators.required]),
    address_line_2: new FormControl('', []),
    address_line_3: new FormControl('', []),
    suburb_taluka: new FormControl('', [Validators.required]),
    city: new FormControl('', []),
    state_name: new FormControl('', [Validators.required]),
    pin_code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    user_image_input: new FormControl('', []),
    user_image: new FormControl('', []),
    education_degree: new FormControl('', []),
    user_summary: new FormControl('', []),
  }
  );

  ngOnInit(): void { }

  onSubmit() {

    if (this.registerForm.get('user_password').value !== this.registerForm.get('user_confirm_password').value) {
      this.notificationService.addError('Passwords dont match');
      return;
    }
    this.registerForm.value['status'] = 'A';
    if (!this.isUpdateMode()) {
      console.log('imageUploadStatus in create mode ' + this.imageUploadStatus);
      if (!this.imageUploadStatus || this.imageUploadStatus === 'FAILED') {
        this.notificationService.addError(this.resources.ImageUploadValidation);
        return;
      }
      this.userService.saveUser(this.registerForm.value).subscribe(
        (response) => {
          this.notificationService.addSuccess(
            this.resources.UserSaveSuccess
          );
          this.router.navigate(['registry/home']);
        },
        (error) => {
          this.notificationService.addError(this.resources.UserSaveFail);
        }
      );
    } else {
      console.log('imageUploadStatus in update mode ' + this.imageUploadStatus);
      this.userService.updateUser(this.registerForm.value).subscribe(
        (response) => {
          this.notificationService.addSuccess(
            this.resources.UserUpdateSuccess
          );
          this.router.navigate(['registry/home']);
        },
        (error) => {
          this.notificationService.addError(this.resources.UserUpdateFail);
        }
      );
    }
  }

  onResetClick() {
    this.registerForm.reset();
  }

  onGenderSelect(e) {
    console.log(e.target.value);
    this.registerForm.controls.gender.setValue(e.target.value);
  }

  onCancelClick() {
    this.router.navigate(['home']);
  }

  isUpdateMode() {
    if (this.mode === 'UPDATE') {
      return true;
    }
    return false;
  }

  handleImageUploadResponse(data) {
    if (data.fileName) {
      this.registerForm.get('user_image').setValue(data.fileName);
      this.imageUploadStatus = 'SUCCESS';
    }
    else {
      this.imageUploadStatus = 'FAILED';
    }
  }
}
