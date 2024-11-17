import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav-manager.service'
import { NavigationService } from '../services/navigation-manager.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {

  private _sidenavService = inject(SidenavService);
  private _navService = inject(NavigationService);

  get sidenavOpened(): boolean {
    return this._sidenavService.sidenavOpened
  }

  constructor() {
  }

  goToSealedPage() {
    this._navService.goToSealedPage();
  }
  goToSinglePage() {
    this._navService.goToSinglePage();
  }
}
