import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private _router = inject(Router);

  productUrl?: string;

  constructor() {
    this.productUrl = "";
  }

  searchProduct() {
    this._router.navigate([`/product/${this.productUrl}`]);
  }
  goToSinglePage() {
    throw new Error('Method not implemented.');
  }
  goToSealedPage() {
    throw new Error('Method not implemented.');
  }

}
