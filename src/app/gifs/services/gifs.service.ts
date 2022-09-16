import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'JXHeFYAcG2aTJP4pcZvbVgbDg18bK5sI';
  private _history: string[] = [];
  private _gifUrl: string = 'https://api.giphy.com/v1/gifs';

  //tipar please
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private _http: HttpClient) {

    this._history = JSON.parse(localStorage.getItem('history')!) || []
    this.results = JSON.parse(localStorage.getItem('results')!) || []

  }

  searchGifs(query: string = '') {

    query = query.trim().toLowerCase();
    if (query.trim().length !== 0) {

      if (!this._history.includes(query)) {
        this._history.unshift(query);
        this._history = this._history.splice(0, 10);

        localStorage.setItem('history', JSON.stringify(this._history));

      }

      const params = new HttpParams()
        .set('api_key', this._apiKey)
        .set('limit', '10')
        .set('q', query);

      this._http.get<SearchGIFResponse>(`${this._gifUrl}/search`, { params })
        .subscribe((r: any) => {
          this.results = r.data;
          localStorage.setItem('results', JSON.stringify(this.results));
        });
    }

  }

}
