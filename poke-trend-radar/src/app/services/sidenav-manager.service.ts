import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    private _sidenavOpened = false;

    get sidenavOpened(): boolean {
        return this._sidenavOpened;
    }

    toggleSidenav() {
        this._sidenavOpened = !this._sidenavOpened;
    }

}