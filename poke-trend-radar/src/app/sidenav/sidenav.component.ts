import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav-manager.service'
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  private _sidenavService = inject(SidenavService);

  get sidenavOpened(): boolean {
    return this._sidenavService.sidenavOpened
  }

  constructor() {
  }

}
