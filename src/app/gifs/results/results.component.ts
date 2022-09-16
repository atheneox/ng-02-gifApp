import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interfaces/gif.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {

  get results(): Gif[] {
    return this.giftService.results;
  }

  constructor(private giftService: GifsService) { }

}
