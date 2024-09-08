import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,RouterModule,Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user:any;
  constructor (private route:ActivatedRoute,private userService:UserService, private router: Router){}
  
  ngOnInit():void{
    const id=this.route.snapshot.params['id']
    this.userService.getUserbyId(id).subscribe((data)=>{
      this.user=data.data;
      console.log(data); 
    })
  }
// Vale, aquí he incluido que salte el alert, para llamar al deleteuser, y que si no se quede en home
  confirmDelete(userId: number) {
    const isConfirmed = confirm('¿Estás seguro de que quieres eliminar al usuario?');

    if (isConfirmed) {
      this.deleteUser(userId);  // Si el usuario confirma, llama a deleteUser
    } else {
      this.router.navigate(['/home']);  // Te devuelve al home si no
    }
  }
  deleteUser(id:number):void{
    this.userService.deleteUser(id).subscribe(()=>{
      this.router.navigate(['/home']);
    })
  }
}
