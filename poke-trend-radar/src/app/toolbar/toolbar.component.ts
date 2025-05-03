import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageRouteEnum } from '../common/common';
import { MiddleClickDirective } from '../directives/middleClick.directive';
import { NavigationService } from '../services/navigation-manager.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MiddleClickDirective, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent {
togglePopup() {
throw new Error('Method not implemented.');
}

  navService = inject(NavigationService);

  constructor() {

  }

  redirectHome() {
    this.navService.routeNavigate(PageRouteEnum.DEFAULT)
  }

  redirectProfileSection() {
    this.navService.routeNavigate(PageRouteEnum.PROFILE_SECTION)
  }

  toggleSidenav() {
    throw new Error('Method not implemented.');
  }

}
