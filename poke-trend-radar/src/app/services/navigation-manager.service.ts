import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PageRouteEnum } from "../common/common";


@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private _router = inject(Router);

    goToSinglePage() {
        this._router.navigate([`/${PageRouteEnum.SINGLES}`]);
    }

    goToSealedPage() {
        this._router.navigate([`/${PageRouteEnum.SEALED}`]);
    }

    goToMyCardsPage() {
        this._router.navigate([`/${PageRouteEnum.MY_CARDS}`]);
    }

    navigateToDetails(url: string) {
        this._router.navigate([`/${PageRouteEnum.PRODUCT_DETAIL}`], { queryParams: { id_url: url } });
    }

    redirectCmPage(url: string, win: Window) {
        win.location.href = url;
    }
}