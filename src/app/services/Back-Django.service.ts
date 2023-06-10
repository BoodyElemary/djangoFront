import { HttpClient } from '@angular/common/http';
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

  // ------------- For Projects
  projectAPI: string = `http://127.0.0.1:8000/api/profile`;
  getProjectInfo(id: number) {
    return this.httpServ.get(`${this.projectAPI}/${id}`);
  }

  // ------------- For Categories
  categoryAPI: string = `http://127.0.0.1:8000/api/profile`;
  getCategoryInfo(id: number) {
    return this.httpServ.get(`${this.categoryAPI}/${id}`);
  }
  registerAPI: string = `http://localhost:8000/users/register/`;

  registerUser(data: any) {
    return this.httpServ.post(this.registerAPI, data);
  }
}
