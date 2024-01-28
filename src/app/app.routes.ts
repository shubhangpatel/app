import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';


export const routes: Routes = [
    {path:"Home",component:HomeComponent,title:"Home"},
    {path:"singup",component:SignupComponent,title:"Singup"},
    {path:"login",component:LoginComponent,title:"login"},
    {path:"Products",component:ProductsComponent,title:'products'}
    
];
