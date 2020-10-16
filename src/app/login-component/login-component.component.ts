import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../login.service';
import { NotificationService } from '../shared/notification.service';
import { LoginService as PostAuthLoginService } from '../shared/login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/';
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
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginService
      .loginUser(this.f.username.value, this.f.password.value)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
            this.loginStatus.loginUserId = this.f.username.value;
          } else {
            this.loading = false;
            this.notificationService.addError('Invalid User Name / Password');
          }
        },
        (error) => {
          this.loginStatus.loginUserId = undefined;
          this.notificationService.addError('Error Occured while logging');
          this.loading = false;
        }
      );
  }
}