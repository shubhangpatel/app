import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  myForm: FormGroup;
  mydata:any
  url = "http://localhost:8000/"
  constructor(private httpclient:HttpClient,private router:Router){

  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log(formData)
    
      // Send a POST request with the form data
      this.httpclient.post(this.url + 'login', formData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/Products'])
          // Handle the response as needed
        },
        error: (err) => {
          console.log(err);
          // Handle the error as needed
        }
      });
    } else {
      // Mark all fields as touched to display validation errors
        console.log('invalid')
    }
  }

}
