import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private host = 'http://localhost:8081/annonces';

  constructor(private http: HttpClient, private authService: AuthenticationService) {

   }

  saveAnnonce(d): Observable<any> {

    const cat = {
      'nom' : d.categorie ,
    };
    const scat = {
      'nom' : d.sousCategorie ,
    };

    d.sousCategorie = null ;
    d.categorie = null ;
    console.log(d);
    const formdata: FormData = new FormData();
    formdata.append('annonce', d);
    formdata.append('cat', cat.nom );
    formdata.append('scat', scat.nom );

    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/' + cat.nom + '/' + scat.nom  , d  , { headers: headers});
  }

  getAnnonce(id): Observable<any> {
     const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/' + id);
  }


  getAnnonces( currentVille: any, currentCategorie: any, currentSubCatgorie: any) {

    console.log(currentVille);
    console.log(currentCategorie);
    console.log(currentSubCatgorie);
  }
  getAnnonces2(currentGov: any, currentCategorie: any, currentSubCatgorie: any) {
    console.log(currentGov);
    console.log(currentCategorie);
    console.log(currentSubCatgorie);
  }
  getAnnonces3( currentCategorie: any, currentSubCatgorie: any) {
    console.log(currentCategorie);
    console.log(currentSubCatgorie);
    return this.http.get(this.host + '/' + currentCategorie + '/' + currentSubCatgorie);

  }


  suggererAnnonce(annonce, sugg): Observable<any> {
    console.log(annonce);
      const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/sugg/' + sugg +'/' +  annonce, {headers: headers});
  }

  commenter(idAnnonce, contenu, username): Observable<any> {
    let params = new HttpParams();

    params = params.set('idAnnonce', idAnnonce);
    params = params.set('contenu', contenu);
    params = params.set('username', username);
console.log(contenu);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/commenter', params, {headers: headers});
  }

  signalerAnnonce(idAnnonce: any, cause: any, username: any): Observable<any> {
    return ;
  }

  getAllAnnonce() {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host );
  }

  getMyAnnonce(id) {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/myannonces/' + id );
  }
  getSugg(id) {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/sugg/' + id ) ;
  }
}
