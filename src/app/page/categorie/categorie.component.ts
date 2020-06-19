import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  private catgories ;
  private subCatgories ;
  private currentCategory;
  private currentSubCat;
  private nameCat;
  private mode ;
  private nameSubCat;
  private user ;



  constructor(private catService: CategoryService ) {
  }

  ngOnInit() {
    this.onAllCategories();
  }

  // <---------- Methodes for Category ---------------->


  onAllCategories() {
    this.catService.getAllCategories().subscribe(data => {
      this.catgories = data ;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }


  onSaveCat(cat) {
    this.catService.saveCategory(cat.nom).subscribe(data => {
      this.onAllCategories();
      this.mode = '';
    }, err => {
      console.log(err);
    });
  }

  onEditCat(cat) {
    this.mode = 'edit-cat';
    this.currentCategory = cat;
    this.nameCat = cat.nom;
  }

  onUpdateCat(cat) {
    console.log(cat);
  }


  onDeleteCat(cat) {
   console.log(cat);
  }


  // <---------- Methodes for Category ---------------->

  onGetSubCategories(cat) {
     console.log(cat);
    this.currentCategory = cat;
     this.catService.getSubCategories(cat).subscribe(data => {
      this.subCatgories = data;
    }, err => {
      console.log(err);
    });
  }


  onSaveSubCat(scat) {
    console.log(scat);
  this.catService.saveSubCategory(this.currentCategory, scat.nom).subscribe(data => {
    this.onGetSubCategories(this.currentCategory);
    this.mode = '';
  }, err => {
    console.log(err);
  });
  }

  onEditsubCat(scat) {
    this.mode = 'edit-sub-cat';
    this.currentSubCat = scat;
    this.nameSubCat = scat.nom;
  }

  onUpdateSubCat(scat) {
    console.log(scat);
  }

  onDeleteSubCat(scat) {
    console.log(scat);
  }


  ajouterCat() {
    this.mode = 'new-cat';
    this.subCatgories = null;
  }
  select(cat) {
    console.log(cat);
  }
}
