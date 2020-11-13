import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../../shared/notification.service';
import { Socket } from 'ngx-socket-io';
import { LoginService } from '../../shared/login.service';
import { Form, FormControl } from '@angular/forms';
import { Resources } from '../../resources';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  @Input() counter: number = undefined;
  @Input() module: string;
  @Output() imageUploadResponseEvent: EventEmitter<any> = new EventEmitter();

  wsurl = 'ws://localhost:3000/';
  imageSrc: string | ArrayBuffer;
  imageObj: File;
  imageFileName: string;
  resources = Resources;

  constructor(
    private notificationService: NotificationService,
    private socket: Socket,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  onUpload(event) {
    const file = event.target.files[0];
    this.imageFileName = file.name;
    console.log('File is ' + this.imageFileName);
    this.imageObj = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
  }
  onImageUpload(event: Event) {
    this.socket.emit('addimage', {
      userid: this.loginService.loginUserId,
      name: this.imageFileName,
      module: this.module,
      src: this.imageSrc,
    });

    this.socket.on('imageuploadresponse', (data, callback) => {
      console.log('Upload Response is ' + JSON.stringify(data));
      if (data.userid === this.loginService.loginUserId) {
        if (data.err) {
          this.notificationService.addError(
            this.resources.UploadImageFail
          );
        } else {
          this.notificationService.addSuccess(this.resources.UploadImageSuccess);
          this.imageUploadResponseEvent.emit({
            fileName: this.imageFileName,
            counter: this.counter,
          });
        }
        console.log('Emitting file name ' + this.imageFileName);
      }
    });
  }
}
