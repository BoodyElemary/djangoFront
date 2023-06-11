import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackDjangoService {
  constructor(private httpServ: HttpClient) {}

  //-------------------------------------------------------------------
  // ------------- For User
  userAPI: string = `http://127.0.0.1:8000/api/profile`;
  getUserInfo(id: number) {
    return this.httpServ.get(`${this.userAPI}/${id}`);
  }
  registerAPI: string = `http://localhost:8000/users/register/`;

  registerUser(data: any) {
    return this.httpServ.post(this.registerAPI, data);
  }

  //----------------------------------------------------------------
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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.post(`${this.projectAPI}/`, project, { headers });
  }
  getOneProjectDonation(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.get(`${this.projectAPI}/${id}/Donations/`, { headers });
  }
  addOneProjectDonation(money:any, id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.post(`${this.projectAPI}/${id}/Donations/`,money, { headers });
  }
  addOneProjectComment(comment: any,id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.post(`${this.projectAPI}/${id}/comments/`, comment,{ headers });
  }

  //--------------------------------------------------------------
  // ------------- For Categories
  categoryAPI: string = `http://127.0.0.1:8000/categories`;
  getAllCategories() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.get(`${this.categoryAPI}/`,{headers});
  }
  getOneCategory(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.get(`${this.categoryAPI}/${id}/projects/ `,{headers});
  }
}
