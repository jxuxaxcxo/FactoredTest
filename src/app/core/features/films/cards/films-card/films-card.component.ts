import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Film } from '../../../../services/swapi.service';

@Component({
  selector: 'app-films-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './films-card.component.html',
  styleUrls: ['./films-card.component.css']
})
export class FilmsCardComponent {
  @Input() film!: Film;
}
