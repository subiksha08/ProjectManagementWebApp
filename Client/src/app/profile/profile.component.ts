import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; // Define the user object to store user details

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch user details from the service or wherever you store them
    this.authService.getUserDetails().subscribe(
      (response: any) => {
        // Assuming the server sends user details directly without an array
        this.user = response;
        console.log(this.user); // Ensure that user is properly assigned
      },
      (error) => {
        console.error('Error fetching user details:', error);
        // Handle error (e.g., display an error message)
      }
    );
  }
}
