import { Component, Input } from '@angular/core';
import { Character, Film, SwapiEntity } from '../../../services/swapi.service';
import { CommonModule } from '@angular/common';
import { FilmsCardComponent } from '../cards/films-card/films-card.component';
import { CharactersCardComponent } from '../cards/characters-card/characters-card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, FilmsCardComponent, CharactersCardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input() data: SwapiEntity[] = [];

  isFilm(item: SwapiEntity): item is Film {
    return (item as Film).title !== undefined;
  }

  isCharacter(item: SwapiEntity): item is Character {
    return (item as Character).name !== undefined;
  }

}
