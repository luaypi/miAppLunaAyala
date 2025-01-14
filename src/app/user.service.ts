import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl="https://reqres.in/api/users"
  constructor(private http:HttpClient) {}

  getUsers():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getUserbyId(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser(user:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,user);
  }

  updateUser(id:number,user:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`,user);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
