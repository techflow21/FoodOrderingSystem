import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_interfaces/User';
import { RegisterDto } from 'src/app/_interfaces/registerDto';
import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  public errorMessage: string = '';
  public showError?: boolean;

  constructor(
    private authService: AuthenticationService,
    private passConfValidator: PasswordConfirmationValidatorService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl(''),
      profileImage: new FormControl(''),
    });

    const confirmControl = this.registerForm.get('confirm');
    const passwordControl = this.registerForm.get('password');
    if (confirmControl && passwordControl) {
      confirmControl.setValidators([
        Validators.required,
        this.passConfValidator.validateConfirmPassword(passwordControl),
      ]);
    }
  }

  public validateControl = (controlName: string) => {
    return (
      this.registerForm.get(controlName)?.invalid &&
      this.registerForm.get(controlName)?.touched
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName)?.hasError(errorName);
  };

  public registerUser = (registerFormValue: any) => {
    this.showError = false;
    const formValues = { ...registerFormValue };
    const user: User = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      username: formValues.userName,
      phoneNumber: formValues.phoneNumber,
      address: formValues.address,
      city: formValues.city,
      state: formValues.state,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      profileImage: formValues.profileImage,
    };

    // this.authService.register('api/authentication/register-user', user).subscribe({
    this.authService.register(user).subscribe({
      next: (_) => console.log('Successful registration'),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      },
    });
  };
}
