import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './page/accueil/accueil.component';
import {LoginComponent} from './page/login/login.component';
import {RegisterComponent} from './page/register/register.component';
import {CompteComponent} from './page/compte/compte.component';
import {TestComponent} from './test/test/test.component';
import {ProfilComponent} from './page/profil/profil.component';
 import {Page404Component} from './page/page404/page404.component';
 import {MessagesComponent} from './page/messages/messages.component';
import {AuthGuard} from './guard/auth.guard';
import {AnnonceComponent} from './page/annonce/annonce.component';
import {CreerAnnonceComponent} from './page/creer-annonce/creer-annonce.component';
import {CategorieComponent} from './page/categorie/categorie.component';
import {AdminGuard} from './guard/admin.guard';
const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full' },
  {path: '', component: AccueilComponent},
  {path: 'login' , component: LoginComponent },
  {path: 'register' , component: RegisterComponent},
  {path: 'profil/:username' , component: ProfilComponent},
  {path: 'MonCompte' , component: CompteComponent, canActivate: [AuthGuard]},
  {path: 'messages' , component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'annonces/:id' , component: AnnonceComponent, canActivate: [AuthGuard]},
  {path: 'creerAnnonce' , component: CreerAnnonceComponent, canActivate: [AuthGuard]},
  {path: 'admin/abonnee' , component: CategorieComponent },
  {path: 'admin/categories' , component: CategorieComponent },

  { path: 'test', component: TestComponent },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


