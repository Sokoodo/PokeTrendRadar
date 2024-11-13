import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageRouteEnum } from '../../app.routes';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { SidenavComponent } from "../../sidenav/sidenav.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, ToolbarComponent, SidenavComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {
  private _router = inject(Router);

  productUrl?: string;

  constructor() {
    this.productUrl = "";
  }

  searchProduct() {
    console.log(this.productUrl)
    this._router.navigate([`/${PageRouteEnum.PRODUCT_DETAIL}`], { queryParams: { id_url: this.productUrl } });
  }
  goToSinglePage() {
    throw new Error('Method not implemented.');
  }
  goToSealedPage() {
    throw new Error('Method not implemented.');
  }

}
