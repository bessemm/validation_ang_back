import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private host = 'http://localhost:8081';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllGestionAbonne(): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/gestionAbonnes', {headers});
  }

  getAllGestionAnnonce(): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/gestionAnnonces', {headers});
  }

  getAllAnnonceReclamation(): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/signalAnnonces', {headers});
  }
}
