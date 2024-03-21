// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }

  register() {
    if (this.registrationForm.valid) {
      const { username, fullname, email, password, role } = this.registrationForm.value;

      // Perform additional validation if needed

      this.authService.register(username, fullname, email,password, role).subscribe(
        (response: any) => {
          console.log('Registration successful!');
          // Redirect or show a success message
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration failure (e.g., show an error message)
        }
      );
    } else {
      console.error('Form is invalid. Please check the fields.');
    }
  }
}
