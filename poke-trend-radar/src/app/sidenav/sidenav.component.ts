import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav-manager.service'
import { NavigationService } from '../services/navigation-manager.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MiddleClickDirective } from '../directives/middleClick.directive';
import { PageRouteEnum } from '../common/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatDividerModule, MiddleClickDirective],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
  private _sidenavService = inject(SidenavService);

  navService = inject(NavigationService);

  get sidenavOpened(): boolean {
    return this._sidenavService.sidenavOpened
  }
  
  goToSealedPage() {
    this.navService.routeNavigate(PageRouteEnum.SEALED);
  }
  goToSinglePage() {
    this.navService.routeNavigate(PageRouteEnum.SINGLES);
  }
  goToMyCardsPage() {
    this.navService.routeNavigate(PageRouteEnum.MY_CARDS);
  }
  goToScrapingCenter() {
    this.navService.routeNavigate(PageRouteEnum.SCRAPING_CENTER);
  }
}
