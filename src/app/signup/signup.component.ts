import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  
  mydata:any
  url = "http://localhost:8000/"
  customerForm: FormGroup;
  constructor(private httpclient:HttpClient){

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.customerForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobilenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
    
      console.log(formData)
    
      
      this.httpclient.post(this.url + 'postData', formData).subscribe({
        next: (response) => {
          console.log(response);
        
        },
        error: (err) => {
          console.log(err);
        
        }
      });
    } else {
      
      console.log("form invalid")
    }
  }
}
