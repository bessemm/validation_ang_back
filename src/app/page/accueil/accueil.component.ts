import {Component, OnInit} from '@angular/core';
import {Gouvernorat} from '../../model/gouvernorat';
import {CategoryService} from '../../service/category.service';
import {AnnonceService} from '../../service/annonce.service';

import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  private gov = Gouvernorat.gov;
  private ville;
  private annonces;
  private  currentCategorie;
  currentSubCatgorie;
  private currentGov;
  private currentVille;
  private recherche = false;
  private motCle;
  private  categories ;
private subCatgories ;
private balise = ['<i class="fas fa-book"></i>', '<i class="fas fa-tools"></i>', '<i class="fas fa-car"></i>',
    '<i class="fas fa-tshirt"></i>', '<i class="fas fa-futbol"></i>', '<i class="fas fa-hands-helping"></i>'];


  constructor(private catService: CategoryService,
               private route: ActivatedRoute, private annonceService: AnnonceService
  ) {
    this.route.params.subscribe(params => {
       this.motCle = this.route.snapshot.paramMap.get('motCle');
      if (this.motCle) {
        this.recherche = true;
        console.log(this.motCle);
      } else {
        this.annonceService.getAllAnnonce().subscribe(data=>{
          this.annonces = data ;
        });
      }
    });
  }

  ngOnInit() {

    this.getCategories();

  }
// ANNONCES
  getAnnonces() {
    if (this.currentGov) {
      if (this.currentVille) {
        this.annonceService.getAnnonces(this.currentVille, this.currentCategorie, this.currentSubCatgorie);
      } else {
        this.annonceService.getAnnonces2(this.currentGov, this.currentCategorie, this.currentSubCatgorie);
      }
    } else {
      this.annonceService.getAnnonces3(this.currentCategorie, this.currentSubCatgorie);
    }
  }

  changeVille(e) {
    this.currentVille = e.target.value;
    // this.getAnnonces();
  }

  getVille(e) {
    this.currentGov = e.target.value;
   // this.getAnnoncesByGovenorat(this.currentGov);
    this.ville = this.gov.filter(value => value.name === this.currentGov);
    this.ville.forEach(v => {
      this.ville = v.villes;
    });
  }
  filterAnnoncesByVille(event) {
    const gov = event.target.value;
    this.annonces = this.annonces.filter(value => value.ville === gov);
  }

  getCategories() {
    this.catService.getAllCategories().subscribe(data => {
      this.categories = data ;
      console.log(data);
    });
  }
  getAnnoncesBySousCategorie(scat) {
    this.currentSubCatgorie = scat;
    // this.getAnnonces();
    this.annonceService.getAnnonces3(this.currentCategorie , this.currentSubCatgorie).subscribe(data => {
      console.log(data);
    });
  }
  getSubCategories(e) {
    console.log(e.target.value) ;
    this.currentCategorie = e.target.value ;
this.catService.getSubCategoriesByCategory(this.currentCategorie).subscribe(data => {
  this.subCatgories = data ;
  console.log(data);
});
  }
}
