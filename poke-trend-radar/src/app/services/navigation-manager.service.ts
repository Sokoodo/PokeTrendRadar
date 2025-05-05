import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PageRouteEnum } from "../common/common";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _router = inject(Router);
    private _sealedUrl = PageRouteEnum.SEALED;
    private _singlesUrl = PageRouteEnum.SINGLES;
    private _ownedUrl = PageRouteEnum.MY_CARDS;
    private _scrapingUrl = PageRouteEnum.SCRAPING_CENTER;

    get singlesUrl(): string {
        return this._singlesUrl;
    }
    get sealedUrl(): string {
        return this._sealedUrl;
    }
    get ownedUrl(): string {
        return this._ownedUrl;
    }
    get scrapingUrl(): string {
        return this._scrapingUrl;
    }
    get pageRouteEnum(): typeof PageRouteEnum {
        return PageRouteEnum
    }

    routeNavigate(page: PageRouteEnum) {
        this._router.navigate([`/${page}`]);
    }

    navigateToDetails(url: string) {
        this._router.navigate([`/${PageRouteEnum.PRODUCT_DETAIL}`], { queryParams: { id_url: url } });
    }

    redirectOnUrlPage(url: string, win: Window) {
        win.location.href = url;
    }

    buildUrlForInternalRedirectToDetails(queryParam: string): string {
        const urlTree = this._router.createUrlTree(
            [`${PageRouteEnum.PRODUCT_DETAIL}`],
            { queryParams: { id_url: queryParam } }
        );
        return this._router.serializeUrl(urlTree);
    }
}