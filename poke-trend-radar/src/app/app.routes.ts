import { Routes } from '@angular/router';
import { ProductDetailPageComponent } from './route-pages/product-detail-page/product-detail-page.component';
import { HomePageComponent } from './route-pages/home-page/home-page.component';
import { SealedPageComponent } from './route-pages/sealed-page/sealed-page.component';
import { SinglesPageComponent } from './route-pages/singles-page/singles-page.component';
import { PageRouteEnum } from './common/common';
import { MyCardsPageComponent } from './route-pages/my-cards-page/my-cards-page.component';
import { StatisticsPageComponent } from './route-pages/statistics-page/statistics-page.component';
import { NotificationPageComponent } from './route-pages/notification-page/notification-page.component';
import { ScrapingCenterPageComponent } from './route-pages/scraping-center-page/scraping-center-page.component';

export const routes: Routes = [
    { path: "", redirectTo: PageRouteEnum.DEFAULT, pathMatch: "full" },
    { path: PageRouteEnum.DEFAULT, component: HomePageComponent },
    { path: PageRouteEnum.PRODUCT_DETAIL, component: ProductDetailPageComponent },
    { path: PageRouteEnum.SEALED, component: SealedPageComponent },
    { path: PageRouteEnum.SINGLES, component: SinglesPageComponent },
    { path: PageRouteEnum.MY_CARDS, component: MyCardsPageComponent },
    { path: PageRouteEnum.PROFILE_SECTION, component: StatisticsPageComponent },
    { path: PageRouteEnum.NOTIFICATIONS, component: NotificationPageComponent },
    { path: PageRouteEnum.SCRAPING_CENTER, component: ScrapingCenterPageComponent },
    { path: "**", redirectTo: PageRouteEnum.DEFAULT }
];

