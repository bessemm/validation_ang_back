import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnonceService} from '../../service/annonce.service';
import {UserService} from '../../service/user.service';
import {Timestamp} from 'rxjs/internal/operators/timestamp';
declare var $: any;

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  private abonne;
  private deposeDate;
  private annonce;
  private user;
  private mesAnnonces;
  private commentr;
  private favoris = false;
  private suggestion;

  constructor(private activatedRoute: ActivatedRoute,
              private annonceService: AnnonceService,
              private userService: UserService,
              private router: Router,
  ) {
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      this.getAnnonce();
    });
  }


  ngOnInit() {
    this.getAnnonce();
    this.getUser();
  }


  getAnnonce() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.annonceService.getAnnonce(id).subscribe(data => {
      this.annonce = data;
      console.log(data);
this.annonceService.getSugg(data.id).subscribe(data=>{
  this.suggestion=data ;
})
      //  this.getAbonne(data.username);
      const x = this.annonce.datePublication;
      const date1 = new Timestamp(x,1);
    //  const diffTime = Math.abs(Date.now() - date1);
      //  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffDays = 0 ;
       console.log(diffDays);
      this.deposeDate = diffDays - 1;

    }, err => {
      console.log(err);
    });
  }

  onSuggerer() {
    // this.username = username;
    this.getMesAnnonces(this.user.username);
    $('#suggererModal').modal('show');
  }

  hideSuggererModal() {
    document.getElementById('close-suggererModal').click();
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.getMesAnnonces(user.username);
      console.log(user);
    });
  }

  getMesAnnonces(id) {
    this.annonceService.getMyAnnonce(id).subscribe(data => {
      this.mesAnnonces = data;
      console.log(this.mesAnnonces);
    });
  }

  selectSuggestion(sugg) {
      console.log(sugg);
    this.hideSuggererModal();
    this.annonce.suggestion.push(sugg);
    this.annonceService.suggererAnnonce(this.annonce.id, sugg ).subscribe( data => {
          this.getAnnonce();
    }, error1 => {
      console.log(error1);
    });
  }
  OnCommenter(comm) {
    console.log(this.commentr);
     console.log(this.annonce.id);
    console.log(this.user.username);
    this.annonceService.commenter(this.annonce.id, this.commentr, this.user.username).subscribe( data => {
      this.annonce = data;

    }, error1 => {
      console.log(error1);
    });
  }

  ajouterFavoris() {
    this.user.favoris.push(this.annonce.id);
    console.log(this.user.favoris);
    this.userService.ajouterFavoris(this.user).subscribe( data => {
      this.favoris = true;
    });
  }

  onSignaler() {
    $('#signalerAnnonceModal').modal('show');
  }

  envoyerSignaleModal(cause) {
    if (cause) {
      this.annonceService.signalerAnnonce(this.annonce.id, cause, this.user.username).subscribe(data => {
      });
    }
    this.hideSignaleModal();
  }

  hideSignaleModal() {
    document.getElementById('close-signalerAnnonceModal').click();
  }



}



