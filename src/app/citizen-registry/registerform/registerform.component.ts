import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitizenregistrationService } from '../citizenregistration.service';
import { ImageuploadserviceService } from '../../shared/imageuploadservice.service';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit {
  imageSrc: string;
  genderList: any = ['Male', 'Female'];
  imageObj: File;
  imageUrl: string;

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
  constructor(
    private userService: CitizenregistrationService,
    private imageService: ImageuploadserviceService
  ) {}

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

  onUpload(event) {
    const file = event.target.files[0];
    this.imageObj = file;
    console.log(this.imageObj);
  }
  onImageUpload(event: Event) {
    console.log('In onImageUpload start..');
    const formData = new FormData();
    formData.append('image', this.imageObj);
    console.log(formData);
    this.imageService.imageUpload(formData);
    console.log('In onImageUpload End..');
  }
}
