import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { PageRouteEnum } from '../common/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  private _router = inject(Router);

  constructor() {

  }

  redirectHome() {
    this._router.navigate([`/${PageRouteEnum.DEFAULT}`]);
  }

  toggleSidenav() {
    throw new Error('Method not implemented.');
  }

}
