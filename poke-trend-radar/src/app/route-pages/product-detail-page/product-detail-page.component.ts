import { Component, inject } from '@angular/core';
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";
import { ActivatedRoute } from '@angular/router';
import { ToolbarComponent } from "../../toolbar/toolbar.component";

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductDetailComponent, ToolbarComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent {
  prodUrl: string;

  private _actRoute = inject(ActivatedRoute);

  constructor() {
    this.prodUrl = "";
  }

  ngOnInit(): void {
    this._actRoute.queryParams.subscribe(params => {
      this.prodUrl = params['id_url'];
      console.log('Product ID:', this.prodUrl);
    });
  }
}
