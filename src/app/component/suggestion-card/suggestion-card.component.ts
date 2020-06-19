import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.scss']
})
export class SuggestionCardComponent implements OnInit {


  @Input() annonce;


  constructor(
  ) {

  }

  ngOnInit() {
    this.getAnnonce();

  }

  getAnnonce() {

  }
}
