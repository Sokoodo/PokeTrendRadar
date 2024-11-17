import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent implements OnInit, OnDestroy {
  prodUrl: string;
  private _subs: Subscription[];
  private _actRoute = inject(ActivatedRoute);

  constructor() {
    this.prodUrl = "";
    this._subs = [];
  }

  ngOnInit(): void {
    this._subs.push(
      this._actRoute.queryParams.subscribe(params => {
        this.prodUrl = params['id_url'];
        console.log('Product ID:', this.prodUrl);
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}
