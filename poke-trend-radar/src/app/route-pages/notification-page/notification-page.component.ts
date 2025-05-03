import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CustomNotification, NotificationService } from '../../services/notification-manager.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NotificationPageComponent {
  private _notificationService = inject(NotificationService);

  allNotifications: CustomNotification[];

  constructor() {
    this.allNotifications = [];
  }

  ngOnInit() {
    this.allNotifications = this._notificationService.getAllNotifications();
  }
}
