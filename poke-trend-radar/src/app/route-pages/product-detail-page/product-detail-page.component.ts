import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent extends BaseComponent implements OnInit {
  prodUrl: string;
  private _actRoute = inject(ActivatedRoute);

  constructor() {
    super();
    this.prodUrl = "";
  }

  ngOnInit(): void {
    this._actRoute.queryParams.pipe(
      takeUntil(this.destroyed)
    ).subscribe(params => {
      this.prodUrl = params['id_url'];
      console.log('Product ID:', this.prodUrl);
    })
  }

}
