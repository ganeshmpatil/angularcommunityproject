import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { ImageuploadserviceService } from '../../shared/imageuploadservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Resources } from '../../resources';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../../shared/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() mode: 'CREATE' | 'UPDATE' = 'CREATE';
  resources = Resources;

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
    private imageService: ImageuploadserviceService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  wsurl: string = 'ws://localhost:3000/';
  imageSrc: string | ArrayBuffer;
  imageObj: File;
  imageUrl: string;
  imageFileName: string;

  registerForm = new FormGroup({
    userid: new FormControl(this.loginService.loginUserId, []),
    headline: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    photo: new FormControl('', []),
    recordnumber: new FormControl('1', []),
  });

  onSubmit() {
    this.registerForm.value['status'] = 'A';
    if (!this.isUpdateMode) {
      this.articleService.createArticles(this.registerForm.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    } else {
      this.articleService.updateArticles(this.registerForm.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  isUpdateMode() {
    if (this.mode === 'UPDATE') {
      return true;
    }
    return false;
  }

  onCancelClick() {
    this.router.navigate(['home']);
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
      name: 'article' + this.imageFileName,
      src: this.imageSrc,
    });
    console.log('In onImageUpload End..');
  }
}
