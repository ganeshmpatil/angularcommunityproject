import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { LoginService as PostAuthLoginService } from '../shared/login.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string = '/';
  submitted = false;
  loading = false;
  token: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private loginStatus: PostAuthLoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginService
      .resetPassword(this.token, this.f.password.value)
      .subscribe(
        (data) => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
          this.loginStatus.loginUserId = this.f.username.value;
        },
        (error) => {
          this.loginStatus.loginUserId = undefined;
          this.notificationService.addError(
            'Error Occured while Passeord Reset '
          );
          this.loading = false;
        }
      );
  }
}
