import { Component, ElementRef, HostListener, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageRouteEnum } from '../common/common';
import { MiddleClickDirective } from '../directives/middleClick.directive';
import { NavigationService } from '../services/navigation-manager.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { CustomNotification, NotificationService } from '../services/notification-manager.service';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MiddleClickDirective, MatIconModule, MatBadgeModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent extends BaseComponent implements OnInit {
  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  private _router = inject(Router);
  private _notificationService = inject(NotificationService);
  private _elRef = inject(ElementRef);

  navService = inject(NavigationService);

  recentNotifications: CustomNotification[];
  lastFourNotifications: CustomNotification[];
  dropdownOpen: boolean;
  areNotificationsChecked: boolean;

  constructor() {
    super();
    this.recentNotifications = [];
    this.dropdownOpen = false;
    this.lastFourNotifications = [];
    this.areNotificationsChecked = false;
  }

  ngOnInit(): void {
    this._notificationService.notifications$.pipe(
      takeUntil(this.destroyed)
    ).subscribe(notifications => {
      this.recentNotifications = notifications;
      this.areNotificationsChecked = false;
    })
  }

  redirectHome() {
    this.navService.routeNavigate(PageRouteEnum.DEFAULT);
  }

  redirectProfileSection() {
    this.navService.routeNavigate(PageRouteEnum.PROFILE_SECTION);
  }

  toggleSidenav() {
    throw new Error('Method not implemented.');
  }

  toggleDropdown() {
    if (this.recentNotifications.length > 0) {
      setTimeout(() => {
        this.dropdownOpen = !this.dropdownOpen;
        this.lastFourNotifications = this._notificationService.getRecentNotifications(4);
        this.areNotificationsChecked = true;
      });
    }
  }

  goToNotificationPage() {
    this.dropdownOpen = false;
    this._router.navigate(['/notifications']);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.dropdownOpen == true) {
      const target = event.target as HTMLElement;
      const clickedInsideDropdown = this.dropdownRef?.nativeElement.contains(target);
      const clickedBellButton = this._elRef.nativeElement.querySelector('.bell-btn')?.contains(target);
      if (!clickedInsideDropdown && !clickedBellButton) {
        this.dropdownOpen = false;
      }
    }
  }
}
