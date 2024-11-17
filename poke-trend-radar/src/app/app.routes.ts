import { Routes } from '@angular/router';
import { ProductDetailPageComponent } from './route-pages/product-detail-page/product-detail-page.component';
import { HomePageComponent } from './route-pages/home-page/home-page.component';
import { SealedPageComponent } from './route-pages/sealed-page/sealed-page.component';
import { SinglesPageComponent } from './route-pages/singles-page/singles-page.component';
import { PageRouteEnum } from './common/common';


export const routes: Routes = [
    { path: "", redirectTo: PageRouteEnum.DEFAULT, pathMatch: "full" },
    { path: PageRouteEnum.DEFAULT, component: HomePageComponent },
    { path: PageRouteEnum.PRODUCT_DETAIL, component: ProductDetailPageComponent },
    { path: PageRouteEnum.SEALED, component: SealedPageComponent },
    { path: PageRouteEnum.SINGLES, component: SinglesPageComponent },
    { path: "**", redirectTo: PageRouteEnum.DEFAULT }
];

