import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { routes } from '../app.routes';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  isEdit: boolean = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      avatar: [null, Validators.required],
    });
  }
  // void: cuando un método no devuelve nada (no tiene return)
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.isEdit = true;
      // this.UserService.getUserbyId(this.userId).subscribe((data)=>{this.userForm.patchValue(data)})
      this.loadUserData();
    }
  }

  loadUserData(): void {
    this.UserService.getUserbyId(this.userId).subscribe((data) => {
      // Rellena el formulario con los datos del usuario
      console.log(data.data);
      data=data.data;
      // this.userForm.patchValue(data);
      this.userForm.patchValue({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        avatar: data.avatar || '',
      });
    });
  }
  // submitForm(): void {
  //     console.log('0');
  //     // Crea el objeto del usuario con los datos del formulario
  //     const user = {
  //       name: this.userForm.get('first_name')?.value, // Obtener el nombre desde el formulario
  //       job: 'leader' // Puedes cambiar esto o agregar más campos si es necesario
  //     };
  
  //     // Llamada al servicio para crear el usuario
  //     this.UserService.createUser(user).subscribe(
  //       response => {
  //         console.log('Usuario creado con éxito', response); // Log de éxito
  //         this.router.navigate(['/home']); // Navega a la página de inicio después de crear el usuario
  //       },
  //       error => {
  //         console.error('Error al crear el usuario', error); // Log en caso de error
  //       }
  //     );
  // }

  submitForm(): void {
    // if (this.userForm.valid) {
      console.log('0');
      if (this.isEdit) {
        console.log('1');
        this.UserService.updateUser(this.userId, this.userForm.value).subscribe(
          response => {
            console.log('Usuario actualizado con éxito', response);
            alert('Usuario actualizado con éxito');
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Error al actualizar el usuario', error);
          }
        );
      } else {
        console.log('2');
        const user = {
          name: this.userForm.get('first_name')?.value,
          job: 'leader' // O cualquier valor que desees
        };
        this.UserService.createUser(user).subscribe(
          response => {
            console.log('Formulario enviado');
            console.log('Usuario creado con éxito', response);
            alert('Usuario creado con éxito');
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Error al crear el usuario', error);
          }
        );
      }
    // }
  }
}
