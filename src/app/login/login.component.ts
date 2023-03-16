import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) {}

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  registerForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  isRegister = false;
  showRegister() {
    this.isRegister = true;
  }
  showLogin() {
    this.isRegister = false;
  }

  login() {
    if (this.loginForm.invalid) {
      localStorage.clear();
      return;
    }
    this.loginService
      .login(this.loginForm.value.username)
      .subscribe((data: any) => {
        if (this.loginForm.value.password === data.password) {
          localStorage.clear();
          localStorage.setItem(
            'user',
            JSON.stringify({ ...data, isLogedin: true })
          );
          this.route.navigateByUrl("/todos")

        }
      });
  }

  register() {
    this.loginService
      .createNewUser(this.registerForm.value)
      .subscribe((response: any) => {
        if (!response?.ok) {
          return;
        }
        this.registerForm.reset();
        this.loginForm.setValue({
          username: response.body.username,
          password: response.body.password,
        });
        this.showLogin();
      });
  }
}
