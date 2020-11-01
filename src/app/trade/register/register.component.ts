import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/login.service';
import { Resources } from '../../resources';
import { Router, ActivatedRoute } from '@angular/router';
import { TradeService } from '../trade.service';
import { Socket } from 'ngx-socket-io';
import { NotificationService } from '../../shared/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() mode: 'CREATE' | 'UPDATE' = 'CREATE';
  resources = Resources;
  imageUploadStatus: 'SUCCESS' | 'FAILED' = undefined;
  recordnumber: any = 1;
  controlName: any;
  moduleName = 'trade';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private tradeService: TradeService,
    private socket: Socket,
    private notificationService: NotificationService,

  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('Params ' + JSON.stringify(params));
      if (params['mode'] != undefined) {
        this.mode = 'UPDATE';
        this.registerForm.get('userid').setValue(params['userid']);
        this.registerForm.get('item_name').setValue(params['item_name']);
        this.registerForm.get('item_desc').setValue(params['item_desc']);
        this.registerForm.get('item_photo_1').setValue(params['item_photo_1']);
        this.registerForm.get('item_photo_2').setValue(params['item_photo_2']);
        this.registerForm.get('item_photo_3').setValue(params['item_photo_3']);
        this.registerForm.get('item_photo_4').setValue(params['item_photo_4']);
        this.registerForm.get('item_photo_5').setValue(params['item_photo_5']);
        this.registerForm
          .get('contact_number')
          .setValue(params['contact_number']);
        this.registerForm
          .get('contact_email')
          .setValue(params['contact_email']);
        this.registerForm.get('recordnumber').setValue(params['recordnumber']);

        this.registerForm.get('amount').setValue(params['amount']);
      }
    });
  }

  ngOnInit(): void {}

  registerForm = new FormGroup({
    userid: new FormControl(this.loginService.loginUserId, []),
    item_name: new FormControl('', [Validators.required]),
    item_desc: new FormControl('', [Validators.required]),
    item_photo_1: new FormControl('', []),
    item_photo_2: new FormControl('', []),
    item_photo_3: new FormControl('', []),
    item_photo_4: new FormControl('', []),
    item_photo_5: new FormControl('', []),
    contact_number: new FormControl('', [Validators.required]),
    contact_email: new FormControl('', []),
    amount: new FormControl('', [Validators.required]),
    recordnumber: new FormControl(this.recordnumber, []),
  });

  isUpdateMode() {
    if (this.mode === 'UPDATE') {
      return true;
    }
    return false;
  }

  onSubmit() {
    this.registerForm.value['status'] = 'A';

    if (!this.isUpdateMode()) {
      if (this.imageUploadStatus === undefined || this.imageUploadStatus === 'FAILED'){
        this.notificationService.addError('please upload images before submit.');
        return;
      }
      this.tradeService.createTrade(this.registerForm.value).subscribe(
        (response) => {
          this.router.navigate(['trade/home']);
        },
        (error) => console.log(error)
      );
    } else {
      this.tradeService.updateTrade(this.registerForm.value).subscribe(
        (response) => this.router.navigate(['trade/home']),
        (error) => console.log(error)
      );
    }
  }

  onResetClick() {
    this.registerForm.reset();
  }

  onCancelClick() {
    this.router.navigate(['trade/home']);
  }

  handleImageUploadResponse(data)
  {
    if (data.fileName){
      this.controlName = 'item_photo_' + data.counter;
      this.registerForm.get(this.controlName).setValue(data.fileName);
      this.imageUploadStatus = 'SUCCESS';
    }
    else{
      this.imageUploadStatus = 'FAILED';
    }
  }
}
