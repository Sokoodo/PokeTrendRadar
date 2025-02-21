import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FiltersManagerService {

    private _loadingSubject: BehaviorSubject<boolean>;
    public loading$: Observable<boolean>;

    constructor(private http: HttpClient) {
        this._loadingSubject = new BehaviorSubject<boolean>(false);
        this.loading$ = this._loadingSubject.asObservable();
    }

    startScraping(filtersType?: string): Observable<any> {
        let apiUrl: string = `${environment.apiBaseUrl}/api/scraping/programmatic_scraping`;
        if (filtersType != undefined) {
            switch (filtersType) {
                case "Singles":
                    apiUrl = `${environment.apiBaseUrl}/api/scraping/programmatic_scraping_singles`
                    break;
                case "Sealed":
                    apiUrl = `${environment.apiBaseUrl}/api/scraping/programmatic_scraping_sealed`
                    break;
            }
        }
        return this.http.get(apiUrl);
    }

    startLoading(): void {
        this._loadingSubject.next(true);
    }

    stopLoading(): void {
        this._loadingSubject.next(false);
    }
}