import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users:any[]=[];
  constructor(private userService:UserService){}
  ngOnInit():void{
    this.userService.getUsers().subscribe((data)=>{
      this.users=data.data; //data recupera de la api, y se guarda dentro de users
      console.log(data);
    })
  }
// Vale, aquí he incluido que salte el alert, para llamar al deleteuser, y que si no se quede en home
  confirmDelete(userId: number) {
    const isConfirmed = confirm('¿Estás seguro de que quieres eliminar al usuario?');

    if (isConfirmed) {
      this.deleteUser(userId); 
    } else {
      console.log();
    }}

      deleteUser(id:number):void{
        this.userService.deleteUser(id).subscribe(()=>{
          this.users=this.users.filter(user=>user.id !==id);
        })
      }
      

  }
 