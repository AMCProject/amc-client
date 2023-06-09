import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/models/dtos/UserDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/users/user.service';

@Component({
  selector: 'amc-authentication',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AuthenticationComponent {

  loginForm: FormGroup;
  signUpForm: FormGroup;

  isLogin = true;
  errorMsg: string;

  private passwordValidator = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordValidator)])
    })

    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordValidator)])
    })

    this.authService.errorMsg.subscribe(errMsg => {
      this.errorMsg = errMsg
      if (errMsg) {
        this.snackBar.open(errMsg, "OK");
      }
    });
  }

  ngOnInit() {

  }

  changeForm() {
    this.loginForm.reset();
    this.signUpForm.reset();
    this.authService.errorMsg.next(null);
    this.isLogin = !this.isLogin;
  }

  login() {
    this.loginForm.markAllAsTouched();

    console.log(this.loginForm.valid)

    const loginBody = new UserDto();
    loginBody.mail = this.loginForm.get("email").value;
    loginBody.password = this.loginForm.get("password").value;

    this.authService.login(loginBody);
  }

  signUp() {
    this.signUpForm.markAllAsTouched();

    const signUpBody = new UserDto();
    signUpBody.mail = this.signUpForm.get("email").value;
    signUpBody.name = this.signUpForm.get("name").value;
    signUpBody.password = this.signUpForm.get("password").value;

    this.authService.signup(signUpBody);
  }

}
