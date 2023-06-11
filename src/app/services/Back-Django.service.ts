import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackDjangoService {
  constructor(private httpServ: HttpClient) {}

  // ------------- For User
  userAPI: string = `http://127.0.0.1:8000/api/profile`;
  getUserInfo(id: number) {
    return this.httpServ.get(`${this.userAPI}/${id}`);
  }
  registerAPI: string = `http://localhost:8000/users/register/`;

  registerUser(data: any) {
    return this.httpServ.post(this.registerAPI, data);
  }

  // ------------- For Projects

  projectAPI: string = `http://localhost:8000/projects`;
  getAllProjects() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    console.log(token);
    console.log(headers);
    return this.httpServ.get(`${this.projectAPI}/`, { headers });
  }

  getOneProject(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.get(`${this.projectAPI}/${id}/`, { headers });
  }

  addOneProject(project: any) {
    return this.httpServ.post(`${this.projectAPI}`, project);
  }

  // ------------- For Categories
  categoryAPI: string = `http://127.0.0.1:8000/categories`;
  getAllCategories() {
    return this.httpServ.get(`${this.categoryAPI}`);
  }
  getOneCategories(id: number) {
    return this.httpServ.get(`${this.categoryAPI}/${id}/`);
  }
}
