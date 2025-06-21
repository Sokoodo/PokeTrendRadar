import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsManagerService {

  private apiUrl = `${environment.apiBaseUrl}/api/statistics/total_singles_current_price`;
  private http = inject(HttpClient);

  getSinglesListFromApi(): Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }

}
