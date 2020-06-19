import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnonceService} from '../../service/annonce.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  private user;
  private registerForm: FormGroup;
  private annonces;
private  nbreAbonee ;
  private  nbreAnnonce ;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private annnceSrvcie: AnnonceService
) {
  }

  ngOnInit() {
    this.getUser();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
getMesAnnonce(id) {
    this.annnceSrvcie.getMyAnnonce(id).subscribe(data => {
      this.annonces = data ;
      console.log(data);
    }, error => {
      console.log(error);
  });
}

  getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.getMesAnnonce(this.user.username);
      this.getNbreAbonne(this.user.username) ;
       console.log(user);
    });
  }

  getNbreAbonne(id) {
    this.userService.getbnreAbonne(id).subscribe(data => {
      this.nbreAbonee = data;
      console.log(data);
    });
    this.userService.getbnreannonce(id).subscribe(data => {
      this.nbreAnnonce = data;
      console.log(data);
    });

  }

}



