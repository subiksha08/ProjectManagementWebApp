import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
// ---login with token---
//   login() {
//     if (this.loginForm.valid) {
//       const { username, password } = this.loginForm.value;

//       this.authService.login(username, password).subscribe(
//         (response: any) => {
//           console.log('Login successful!');
//           localStorage.setItem('token', response.token);

//           // Set user role in the AuthService
//           this.authService.setUserRoleFromToken(response.token);

//           // Redirect to the dashboard or another route
//           this.router.navigate(['/dashboard']);
//         },
//         (error) => {
//           console.error('Login failed:', error);
//           // Display an error message to the user
//         }
//       );
//     } else {
//       console.error('Form is invalid. Please check the fields.');
//     }
//   }
// }

login() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response: any) => {
        console.log('Login successful!');
        localStorage.setItem('token', response.token)

        // Redirect to the dashboard or another route
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        // Display an error message to the user
      }
    );
  } else {
    console.error('Form is invalid. Please check the fields.');
  }
}
}
