import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SwapiEntityType } from './core/shared/categories.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatSidenavModule, MatToolbarModule, MatListModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  SwapiEntityType = SwapiEntityType;
  title = 'FactoredTest';
}
