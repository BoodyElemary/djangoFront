import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackDjangoService {
  constructor(private httpServ:HttpClient) { }

  // ------------- For User
  userAPI:string = `http://127.0.0.1:8000/api/profile`
  getUserInfo(id:number){
    return this.httpServ.get(`${this.userAPI}/${id}`)
  }

  // ------------- For Projects
  projectAPI:string = `http://localhost:8000/projects`
  getAllProjects(){
    return this.httpServ.get(`${this.projectAPI}`)
  }
  getOneProjects(id:number){
    return this.httpServ.get(`${this.projectAPI}/${id}/`)
  }
  addOneProject(project:any){
    return this.httpServ.post(`${this.projectAPI}`,project)
  }


  // ------------- For Categories
  categoryAPI:string = `http://127.0.0.1:8000/categories`
  getAllCategories(){
    return this.httpServ.get(`${this.categoryAPI}`)
  }
  getOneCategories(id:number){
    return this.httpServ.get(`${this.categoryAPI}/${id}/`)
  }

}
