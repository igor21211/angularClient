import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  // @ts-ignore
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username:['', Validators.compose([Validators.required])],
      firstname:['', Validators.compose([Validators.required])],
      lastname:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])],
      confirmPassword:['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    console.log(this.registerForm);
    this.authService.register({
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar("Successfully Registered!");
    }, error => {
      console.error(error);
      this.notificationService.showSnackBar("Something went wrong");
    });
  }

  back() {
    this.router.navigate(['/login']);
  }

}
