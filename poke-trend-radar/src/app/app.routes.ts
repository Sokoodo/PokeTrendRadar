import { Routes } from '@angular/router';
import { ProductDetailPageComponent } from './route-pages/product-detail-page/product-detail-page.component';
import { HomePageComponent } from './route-pages/home-page/home-page.component';

export enum PageRouteEnum {
    DEFAULT = "home",
    PRODUCT_DETAIL = "product-details/:id_url"
}

export const routes: Routes = [
    { path: "", redirectTo: PageRouteEnum.DEFAULT, pathMatch: "full" },
    { path: PageRouteEnum.DEFAULT, component: HomePageComponent },
    { path: PageRouteEnum.PRODUCT_DETAIL, component: ProductDetailPageComponent },
    { path: "**", redirectTo: PageRouteEnum.DEFAULT }
];

