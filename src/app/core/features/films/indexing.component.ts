import { Component, OnInit, inject } from '@angular/core';
import { SwapiService, SwapiEntity } from '../../services/swapi.service';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PAGINATION_SIZE } from '../../shared/constants';
import { ActivatedRoute } from '@angular/router';
import { SwapiEntityType } from '../../shared/categories.enum';
import { BehaviorSubject, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    CardListComponent,
    MatToolbarModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './indexing.component.html',
  styleUrls: ['./indexing.component.css'],
})
export class IndexComponent implements OnInit {
  private swapiService = inject(SwapiService);
  private route = inject(ActivatedRoute);

  items: SwapiEntity[] = [];
  filteredItems: SwapiEntity[] = [];
  pageSize: number = PAGINATION_SIZE;
  currentPage: number = 1;
  totalItems: number = 0;
  searchTerm: string = '';
  currentSection: string = "";

  private sectionSubject = new BehaviorSubject<SwapiEntityType>(SwapiEntityType.Films);

  ngOnInit() {
    this.sectionSubject
      .pipe(
        switchMap((section) => {
          switch (section) {
            case SwapiEntityType.Films:
              return this.swapiService.getFilms();
            case SwapiEntityType.People:
              return this.swapiService.getPeople();
            default:
              return of([]);
          }
        })
      )
      .subscribe({
        next: (items) => {
          this.items = items;
          this.totalItems = items.length;
          this.applyFilter();
          this.updatePagination();
        },
        error: (err) => console.error('Error fetching data:', err),
      });

      this.route.url.subscribe((segments) => {
        const newSection = segments[0]?.path as SwapiEntityType;
        this.sectionSubject.next(newSection);
      });
  }

  applyFilter() {
    this.filteredItems = this.items.filter((item) => {
      if (this.swapiService.isFilm(item)) {
        return item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      } else if (this.swapiService.isCharacter(item)) {
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return false;
    });
    this.totalItems = this.filteredItems.length;
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updatePagination();
  }

  updatePagination() {
    this.applyFilter();
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredItems = this.filteredItems.slice(start, end);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilter();
    this.updatePagination();
  }
}
