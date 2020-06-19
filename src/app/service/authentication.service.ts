import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private host = 'http://localhost:8081';

  public jwt;
  private username: string;
  private roles: Array<string>;


  constructor(private http: HttpClient) {}



  login(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.host + '/login', data, { observe: 'response' });
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }

  parseJWT() {
    const jwtHelper = new JwtHelperService();
    if (this.jwt) {
      const objJWT = jwtHelper.decodeToken(this.jwt);
      this.username = objJWT.sub;
     //  this.roles = jwtHelper.decodeToken(localStorage.getItem('token')).roles[0].authority;

   this.roles = objJWT.roles ;
    }
  }



  getUsername() {
    return this.username;
  }
  isAdmin() {
    return this.roles.indexOf( 'ADMIN') >= 0 ;
  }

  isUser() {
    console.log(this.getrole());
    return this.roles.indexOf('ABONNE') >= 0;
  }

  isAuthenticated() {
    return this.jwt != null ;
    //  return this.roles && (this.isAdmin() || this.isUser());
  }


  logout() {
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }


  getrole() {
    return this.roles ;
  }
}
