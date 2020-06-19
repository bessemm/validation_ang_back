import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private host = 'http://localhost:8081/categories';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }





  edit(url, data): Observable <any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.patch(url, data , {headers : headers});
  }

  delete(url): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.delete(url, {headers: headers});
  }


  // <---------- Methodes for Category ---------------->


  getAllCategories(): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + localStorage.getItem('token')});
    console.log(this.authService.jwt);
    return this.http.get(this.host, {headers : headers} );
  }

  saveCategory(cat): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + localStorage.getItem('token')});
    const data  = { 'nom': cat};
    return this.http.post(this.host , data , { headers: headers});
  }


  getSubCategoriesByCategory(cat): Observable<any> {
    console.log(cat);
    const url = 'http://localhost:8080/categories/souscat/' + cat;
    return this.http.get(url);
  }



  // <---------- Methodes for SubCategory ---------------->



  getSubCategories(url): Observable<any> {
    return this.http.get(this.host + '/souscat/' + url);
  }

  saveSubCategory(cat, scat): Observable < any > {
      const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    console.log(cat);
    return this.http.post(this.host + '/addsubcat/' + cat , scat, {headers: headers});
  }

}
