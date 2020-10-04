import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/login.service';
import { Resources } from '../../resources';
import { Socket } from 'ngx-socket-io';
import { AdvertiseService } from '../advertise.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  imageObj: File;
  imageUrl: string;
  imageFileName: string;
  wsurl: string = 'ws://localhost:3000/';
  imageSrc: string | ArrayBuffer;
  resources = Resources;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private advertiseService: AdvertiseService,
    private socket: Socket
  ) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    userid: new FormControl('ganesh.patil.31@gmail.com', []),
    photo: new FormControl('', [Validators.required]),
    status: new FormControl('A', []),
  });

  onCancelClick() {
    this.router.navigate(['advertise/home']);
  }

  onResetClick() {
    this.registerForm.reset();
  }

  onSubmit() {
    this.advertiseService.createAdvertise(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['']);
      },
      (error) => console.log(error)
    );
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
