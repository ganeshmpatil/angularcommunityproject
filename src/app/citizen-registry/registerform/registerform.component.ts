import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitizenregistrationService } from '../citizenregistration.service';
import { ImageuploadserviceService } from '../../shared/imageuploadservice.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit {
  constructor(
    private userService: CitizenregistrationService,
    private imageService: ImageuploadserviceService,
    private socket: Socket
  ) {}
  public messages: Subject<any>;
  wsurl: string = 'ws://localhost:3000/';
  imageSrc: string | ArrayBuffer;
  genderList: any = ['Male', 'Female'];
  imageObj: File;
  imageUrl: string;
  imageFileName: string;

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message',
  };

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
    /* const formData = new FormData();
    formData.append('image', this.imageObj); */

    /* this.messages = <Subject<any>>this.imageService.connect(this.wsurl).pipe(
      map((response: MessageEvent): any => {
        console.log(response);
        return { name: 'ganesh' };
      })
    );
    this.messages.subscribe((msg) => {
      console.log('Response from websocket: ' + msg);
    });
    this.messages.next(this.message); */

    this.socket.emit('addimage', {
      name: this.imageFileName,
      src: this.imageSrc,
    });
    console.log('In onImageUpload End..');
  }
}
