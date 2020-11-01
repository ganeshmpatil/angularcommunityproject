import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { ImageuploadserviceService } from '../../shared/imageuploadservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Resources } from '../../resources';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../../shared/login.service';
import { NotificationService } from '../../shared/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() mode: 'CREATE' | 'UPDATE' = 'CREATE';
  resources = Resources;
  headline  = '';
  description = '';
  recordnumber: any;
  moduleName: 'article';
  imageUploadStatus: 'SUCCESS' | 'FAILED' = undefined;


  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
    private imageService: ImageuploadserviceService,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('Params ' + JSON.stringify(params));
      if (params['mode'] != undefined) {
        this.mode = 'UPDATE';
        this.registerForm.get('headline').setValue(params['headline']);
        this.registerForm.get('description').setValue(params['description']);
        this.registerForm.get('recordnumber').setValue(params['recordnumber']);
        this.registerForm.get('photo').setValue(params['photo']);
      }
    });
  }

  ngOnInit(): void {}

  registerForm = new FormGroup({
    userid: new FormControl(this.loginService.loginUserId, []),
    headline: new FormControl(this.headline, [Validators.required]),
    description: new FormControl(this.description, [Validators.required]),
    photo: new FormControl('', []),
    recordnumber: new FormControl('', []),
  });

  onSubmit() {
    this.registerForm.value['status'] = 'A';

    if (!this.isUpdateMode()) {
      if (this.imageUploadStatus === undefined || this.imageUploadStatus === 'FAILED'){
        this.notificationService.addError('please upload images before submit.');
        return;
      }
      this.articleService.createArticles(this.registerForm.value).subscribe(
        (response) => {
          this.router.navigate(['articles/home']);
        },
        (error) => console.log(error)
      );
    } else {
      this.articleService.updateArticles(this.registerForm.value).subscribe(
        (response) => this.router.navigate(['articles/home']),
        (error) => console.log(error)
      );
    }
  }
  onResetClick() {
    this.registerForm.reset();
  }

  isUpdateMode() {
    if (this.mode === 'UPDATE') {
      return true;
    }
    return false;
  }

  onCancelClick() {
    this.router.navigate(['articles/home']);
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
