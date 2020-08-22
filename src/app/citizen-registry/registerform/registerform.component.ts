import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitizenregistrationService } from '../citizenregistration.service';
import { ImageuploadserviceService } from '../../shared/imageuploadservice.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit {
  @Input() mode: 'CREATE' | 'UPDATE' = 'CREATE';
  constructor(
    private userService: CitizenregistrationService,
    private imageService: ImageuploadserviceService,
    private socket: Socket,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['userid'] !== undefined) {
        console.log('Received params' + params);
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

  wsurl: string = 'ws://localhost:3000/';
  imageSrc: string | ArrayBuffer;
  genderList: any = ['Male', 'Female'];
  imageObj: File;
  imageUrl: string;
  imageFileName: string;

  registerForm = new FormGroup({
    userid: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    father_full_name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required]),
    email_id: new FormControl('', []),
    village_name: new FormControl('', [Validators.required]),
    address_line_1: new FormControl('', [Validators.required]),
    address_line_2: new FormControl('', []),
    address_line_3: new FormControl('', []),
    suburb_taluka: new FormControl('', [Validators.required]),
    city: new FormControl('', []),
    state_name: new FormControl('महाराष्ट्र', [Validators.required]),
    pin_code: new FormControl('', [Validators.required]),
    user_image_input: new FormControl('', []),
    user_image: new FormControl('', []),
    education_degree: new FormControl('', []),
    user_summary: new FormControl('', []),
  });

  ngOnInit(): void {}

  onSubmit() {
    this.registerForm.value['status'] = 'A';
    console.log(this.registerForm.value);
    this.userService.saveUser(this.registerForm.value);
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

  onUpload(event) {
    const file = event.target.files[0];
    this.imageFileName = file.name;
    console.log('File is ' + file);
    this.imageObj = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.imageSrc = reader.result;
    };
    console.log(this.imageObj);
  }
  onImageUpload(event: Event) {
    console.log('In onImageUpload start..');

    this.socket.emit('addimage', {
      name: this.imageFileName,
      src: this.imageSrc,
    });
    console.log('In onImageUpload End..');
  }
}
