import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = 'http://localhost:8081';


  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }


  // <---------- Methodes for User ---------------->


  register(user): Observable < any > {
    return this.http.post(this.host + '/inscription', user);
  }
  getbnreAbonne(id) {
    const url = this.host +  '/utilisateurs/nbreAbonne/' + id;
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});

    return  this.http.get(url, {headers: headers});
  }

  getCurrentUser(): Observable < any > {
    const username = this.authService.getUsername();
    const url = this.host +  '/utilisateurs/search/findUtilisateurByUsername?username=' + username  ;
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});

    return  this.http.get(url, {headers: headers});  }

  getUserByUsername(username): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/utilisateurs/search/findUtilisateurByUsername?username=' + username, );
  }
  // <---------- Methodes for ADMIN ---------------->
  ajouterFavoris(user: any): Observable < any > {
return null ;
  }

  getAllUsers(){
    return null ;
  }
  deleteUser(id) {
    return null ;
  }

  getbnreannonce(id) {
    const url = this.host +  '/utilisateurs/nbreAnnonce/' + id;
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});

    return  this.http.get(url, {headers: headers});
  }
}
