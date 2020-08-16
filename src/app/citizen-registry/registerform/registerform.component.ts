import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit {
  imageSrc: string;
  genderList: any = ['Male', 'Female'];

  registerForm = new FormGroup({
    userid: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    first_Name: new FormControl('', [Validators.required]),
    last_Name: new FormControl('', [Validators.required]),
    father_full_Name: new FormControl('', [Validators.required]),
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
    user_image: new FormControl('', []),
    user_image_preview: new FormControl('', []),
    education_degree: new FormControl('', []),
    user_summary: new FormControl('', []),
  });
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form was submitted');
  }

  onResetClick() {
    this.registerForm.reset();
  }

  onUpload(event) {
    console.log(event);
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.registerForm.patchValue({
          user_image_preview: reader.result,
        });
      };
    }
  }

  onGenderSelect(e) {
    console.log(e.target.value);
    this.registerForm.controls.gender.setValue(e.target.value);
  }
}
