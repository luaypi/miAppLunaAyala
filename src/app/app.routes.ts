import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'user/:id',component:UserDetailsComponent},
    {path:'newuser',component:UserFormComponent},
    {path:'updateuser/:id',component:UserFormComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
];
