import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../shared/constants';
import { SwapiEntityType } from '../shared/categories.enum';

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

export interface Character {
  name: string;
  height: number;
  mass: string;
  hair_color: string;
  gender: string;
  birth_year: string;
}

export type SwapiEntity = Film | Character;


@Injectable({
  providedIn: 'root',
})
export class SwapiService {

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    const filmApiUrl: string = API_BASE_URL + SwapiEntityType.Films + "/"
    return this.http.get<{ results: Film[] }>(filmApiUrl).pipe(
      map(response => response.results) 
    );
  }

  getPeople(): Observable<Character[]> {
    const peopleApiUrl: string = API_BASE_URL + SwapiEntityType.People +"/"
    return this.http.get<{ results: [] }>(peopleApiUrl).pipe(
      map(response => response.results) 
    );
  }

  isFilm(item: SwapiEntity): item is Film {
    return (item as Film).title !== undefined;
  }

  isCharacter(item: SwapiEntity): item is Character {
    return (item as Character).name !== undefined;
  }
}
