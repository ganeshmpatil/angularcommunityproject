import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Resources } from '../../resources';
import { BloodService } from '../blood.service';
import { LoginService } from '../../shared/login.service';

@Component({
  selector: 'app-blood-register',
  templateUrl: './blood-register.component.html',
  styleUrls: ['./blood-register.component.css'],
})
export class BloodRegisterComponent implements OnInit {
  resources = Resources;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bloodService: BloodService
  ) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    userid: new FormControl('ganesh.patil.31@gmail.com', []),
    blood_group: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.registerForm.value['status'] = 'A';
    this.bloodService.createBloodDetails(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['blooddetails/home']);
      },
      (error) => console.log(error)
    );
  }

  onResetClick() {
    this.registerForm.reset();
  }
  onCancelClick() {
    this.router.navigate(['blooddetails/home']);
  }
}
