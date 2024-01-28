import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  
  reactiveForm: FormGroup
  reactiveForm1: FormGroup
  url = "http://localhost:8000/"
  productData: any;
  boughtMessage: string = '';
  constructor(private httpclient: HttpClient) {

  }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
       productId: new FormControl(null)
    })
  }

  unsubscribe() {
    const data = this.reactiveForm.value.productId;
   
    console.log(data)
    this.httpclient.get(this.url + "product", { params: { id : data } })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.productData=res;
          console.log(this.productData)
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  buyProduct(){
    this.boughtMessage = 'Product successfully bought!';
    
  }

}
