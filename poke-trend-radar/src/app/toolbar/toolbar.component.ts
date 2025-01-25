import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageRouteEnum } from '../common/common';
import { MiddleClickDirective } from '../directives/middleClick.directive';
import { NavigationService } from '../services/navigation-manager.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MiddleClickDirective],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  
  navService = inject(NavigationService);

  constructor() {

  }

  redirectHome() {
    this.navService.routeNavigate(PageRouteEnum.DEFAULT)
  }

  toggleSidenav() {
    throw new Error('Method not implemented.');
  }

}
