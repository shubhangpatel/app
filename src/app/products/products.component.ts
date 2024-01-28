import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule,ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  url = "http://localhost:8000/"
  constructor(private httpclient:HttpClient){

  }
  mydata:any
  getData(){
    this.httpclient.get(this.url+'getData').subscribe({
      next :(data)=>{
      
      console.log(data)
      this.mydata=data
    },
     error :(err)=>{
      console.log(err)
     }})
  }
}
