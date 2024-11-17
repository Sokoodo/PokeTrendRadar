import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation-manager.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {
  private _navService = inject(NavigationService);

  constructor() {
  }

  goToSealedPage() {
    this._navService.goToSealedPage();
  }
  goToSinglePage() {
    this._navService.goToSinglePage();
  }
}
